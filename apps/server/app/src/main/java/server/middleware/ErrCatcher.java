package server.middleware;

import java.util.Map;
import java.util.Optional;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.res_api.ResAPI;
import server.lib.dev.lib_log.LibLog;

@Component
@Order(-1)
public class ErrCatcher implements WebExceptionHandler {

    private final ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    private record RouteFlags(boolean isRouteNotFound, boolean isMethodNotAllowed) {
        public boolean is404or405() {
            return isRouteNotFound || isMethodNotAllowed;
        }
    }

    private RouteFlags extractFlags(String msg) {
        boolean isRouteNotFound = msg.contains("404 NOT_FOUND");
        boolean isMethodNotAllowed = msg.contains("405 METHOD_NOT_ALLOWED");

        return new RouteFlags(isRouteNotFound, isMethodNotAllowed);
    }

    private String getMsg(ServerWebExchange exc, Throwable err, RouteFlags flags, String originalMsg) {
        String msg;

        if (flags.is404or405()) {
            String endpoint = exc.getRequest().getPath().value();

            if (flags.isRouteNotFound())
                msg = String.format("route %s not found 🚦", endpoint);
            else
                msg = String.format("route %s does not support %s requests", endpoint,
                        exc.getRequest().getMethod().toString());
        } else {
            msg = String.format("%s %s", err instanceof ErrAPI ? "❌" : "💣", originalMsg);
        }

        return msg;
    }

    private int getStatus(Throwable err, RouteFlags flags) {
        int status = (err instanceof ErrAPI errInst) ? errInst.getStatus()
                : flags.isRouteNotFound() ? 404 : flags.isMethodNotAllowed() ? 405 : 500;
        return status;
    }

    @Override
    public Mono<Void> handle(ServerWebExchange exc, Throwable err) {

        LibLog.logErr(err);

        String originalMsg = Optional.ofNullable(err.getMessage()).orElse("");
        RouteFlags flags = extractFlags(originalMsg);

        String msg = getMsg(exc, err, flags, originalMsg);
        int status = getStatus(err, flags);

        Map<String, Object> data = (err instanceof ErrAPI errInst) ? (errInst).getData() : null;

        ServerHttpResponse res = exc.getResponse();
        res.setStatusCode(HttpStatus.valueOf(status));
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        ResAPI apiBody = new ResAPI(status, msg, data);

        byte[] bytes;
        try {
            bytes = mapper.writeValueAsBytes(apiBody);
        } catch (JacksonException e) {
            throw new ErrAPI("err build json err catcher");
        }

        return res.writeWith(Mono.just(res.bufferFactory().wrap(bytes)));
    }

}
