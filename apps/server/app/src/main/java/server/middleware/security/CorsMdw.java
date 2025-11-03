package server.middleware.security;

import java.util.Map;

import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.lib.data_structure.prs.Prs;
import server.lib.kits.BaseKit;

@Component
@Order(10)
@RequiredArgsConstructor
public class CorsMdw implements WebFilter {

    private final BaseKit kit;

    @Override
    public Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        Api api = (Api) exc;
        ServerHttpResponse res = api.getResponse();

        String origin = api.getHeader(HttpHeaders.ORIGIN);
        String allowed = kit.getEnvKeeper().getFrontUrl();

        if (!origin.isBlank() && !origin.startsWith(allowed))
            return writeForbidden(res, origin);

        setCorsHeaders(res, allowed);

        if (HttpMethod.OPTIONS.equals(api.getMethod())) {
            res.setStatusCode(HttpStatus.OK);
            return res.setComplete();
        }

        return chain.filter(api);
    }

    private Mono<Void> writeForbidden(ServerHttpResponse res, String origin) {
        res.setStatusCode(HttpStatus.FORBIDDEN);
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String msg = String.format("❌ %s not allowed", origin);
        String body;
        try {
            body = kit.getJack().writeValueAsString(Map.of("msg", msg, "status", 403));
        } catch (JsonProcessingException err) {
            throw new ErrAPI("err writing json cors response");
        }

        DataBuffer buff = res.bufferFactory().wrap(Prs.binaryFromUtf8(body));
        return res.writeWith(Mono.just(buff));
    }

    private void setCorsHeaders(ServerHttpResponse res, String allowed) {
        String allowedHdr = "Origin, Content-Type, Accept, Authorization";

        HttpHeaders resHdr = res.getHeaders();
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, allowedHdr);
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, allowed);
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        resHdr.set(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
    }
}
