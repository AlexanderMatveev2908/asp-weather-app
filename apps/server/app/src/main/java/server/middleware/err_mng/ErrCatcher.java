package server.middleware.err_mng;

import java.util.Map;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;

import com.fasterxml.jackson.core.JacksonException;

import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.res_api.ResAPI;
import server.lib.data_structure.Jack;
import server.lib.dev.lib_log.LibLog;
import server.middleware.err_mng.etc.RecMetaErr;

@Component
@Order(-1)
public final class ErrCatcher implements WebExceptionHandler {

    private ResAPI extractResAPi(ServerWebExchange exc, Throwable err) {
        RecMetaErr recMetaErr = RecMetaErr.fromErr(exc, err);
        Map<String, Object> data = (err instanceof ErrAPI errInst) ? errInst.getData() : null;

        ResAPI apiBody = new ResAPI(recMetaErr.status(), recMetaErr.msg(), data);

        return apiBody;
    }

    @Override
    public Mono<Void> handle(ServerWebExchange exc, Throwable err) {

        LibLog.logErr(err);

        ResAPI apiBody = extractResAPi(exc, err);

        ServerHttpResponse res = exc.getResponse();
        res.setStatusCode(HttpStatus.valueOf(apiBody.getStatus()));
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        byte[] bytes;
        try {
            bytes = Jack.mapper.writeValueAsBytes(apiBody);
        } catch (JacksonException errOfErr) {
            throw new ErrAPI("err build json for err catcher");
        }

        return res.writeWith(Mono.just(res.bufferFactory().wrap(bytes)));
    }

}
