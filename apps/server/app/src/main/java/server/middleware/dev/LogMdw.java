package server.middleware.dev;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.AppFile;
import server.decorators.flow.api.Api;
import server.lib.data_structure.LibShape;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Component
@Order(100)
@SuppressWarnings({ "unchecked" })
public final class LogMdw implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        Api api = (Api) exc;

        Map<String, Object> arg = new LinkedHashMap<>();
        arg.put("url", api.getPath());
        arg.put("method", api.getMethod().toString());
        arg.put("accessToken", normalizeEmpty(api.getHeader("authorization")));
        arg.put("refreshToken", normalizeEmpty(api.getCookie("refreshToken")));
        arg.put("query", normalizeEmpty(api.getQuery()));
        arg.put("parsedQuery", api.getParsedQuery().orElse(null));
        arg.put("parsedForm", handleParsedForm(api));

        return api.getBdStr().defaultIfEmpty("").doOnNext(body -> {

            var norm = api.getContentType().contains("multipart/form-data") ? null : normalizeEmpty(body);

            try {
                arg.put("body", LibShape.hasText(norm) ? LibPrs.mapFromJson((String) norm) : norm);
            } catch (Exception err) {
                LibLog.logErr(err);
            }

            LibLog.wOk(arg);
        }).then(chain.filter(api));

    }

    private Object normalizeEmpty(Object obj) {
        if (obj == null)
            return null;
        if (obj instanceof String str && str.isBlank())
            return null;
        if (obj instanceof Map<?, ?> map && map.isEmpty())
            return null;

        return obj;
    }

    private Map<String, Object> handleParsedForm(Api api) {
        var parsedForm = api.getParsedForm().orElse(null);
        if (parsedForm == null || parsedForm.isEmpty())
            return null;

        Map<String, Object> cpyForm = parsedForm.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey,
                Map.Entry::getValue, (oldVal, newVal) -> newVal, LinkedHashMap::new));

        List<AppFile> images = (List<AppFile>) cpyForm.get("images");
        List<AppFile> videos = (List<AppFile>) cpyForm.get("videos");

        if (images != null)
            cpyForm.put("images", images.stream().map(AppFile::getFancyShape).toList());

        if (videos != null)
            cpyForm.put("videos", videos.stream().map(AppFile::getFancyShape).toList());

        return cpyForm;
    }

}
