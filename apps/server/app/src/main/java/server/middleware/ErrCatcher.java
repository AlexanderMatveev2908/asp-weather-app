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

import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.res_api.ResAPI;
import server.lib.data_structure.Jack;
import server.lib.dev.lib_log.LibLog;
import server.paperwork.Reg;

@Component
@Order(-1)
public final class ErrCatcher implements WebExceptionHandler {

    private String getPrettyMsg(ServerWebExchange exc, Throwable err, RouteFlags flags, String originalMsg) {
        if (flags.is404or405())
            return flags.get404or405Msg(exc);
        else
            return Reg.isFirstCharEmoji(originalMsg) ? originalMsg
                    : String.format("%s %s", err instanceof ErrAPI ? "❌" : "💣", originalMsg);
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
        RouteFlags flags = RouteFlags.fromMsg(originalMsg);

        String msg = getPrettyMsg(exc, err, flags, originalMsg);
        int status = getStatus(err, flags);

        Map<String, Object> data = (err instanceof ErrAPI errInst) ? errInst.getData() : null;

        ServerHttpResponse res = exc.getResponse();
        res.setStatusCode(HttpStatus.valueOf(status));
        res.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        ResAPI apiBody = new ResAPI(status, msg, data);

        byte[] bytes;
        try {
            bytes = Jack.mapper.writeValueAsBytes(apiBody);
        } catch (JacksonException errOfErr) {
            throw new ErrAPI("err build json for err catcher");
        }

        return res.writeWith(Mono.just(res.bufferFactory().wrap(bytes)));
    }

}

final record RouteFlags(boolean isRouteNotFound, boolean isMethodNotAllowed) {
    public static RouteFlags fromMsg(String msg) {
        boolean isRouteNotFound = msg.contains("404 NOT_FOUND");
        boolean isMethodNotAllowed = msg.contains("405 METHOD_NOT_ALLOWED");

        return new RouteFlags(isRouteNotFound, isMethodNotAllowed);
    }

    public boolean is404or405() {
        return isRouteNotFound || isMethodNotAllowed;
    }

    public String get404or405Msg(ServerWebExchange exc) {
        String endpoint = exc.getRequest().getPath().value();
        String msg;

        if (isRouteNotFound)
            msg = String.format("❌ route %s not found 🚦", endpoint);
        else
            msg = String.format("❌ route %s does not support %s requests 🚦", endpoint,
                    exc.getRequest().getMethod().toString());

        return msg;
    }
}