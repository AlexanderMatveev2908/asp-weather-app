package server.middleware.base_mdw;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.fasterxml.jackson.core.type.TypeReference;

import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.lib.data_structure.prs.LibPrs;
import server.middleware.base_mdw.etc.services.FormChecker;
import server.middleware.base_mdw.etc.services.RateLimitSvc;

public abstract class BaseMdw implements WebFilter {

    @Autowired
    private RateLimitSvc rl;
    @Autowired
    private FormChecker formCk;

    protected abstract Mono<Void> handle(Api api, WebFilterChain chain);

    @Override
    public Mono<Void> filter(ServerWebExchange exc, WebFilterChain chain) {
        var api = (Api) exc;
        return handle(api, chain);
    }

    private <T> Mono<Void> checkForm(Api api, T form) {
        return formCk.check(api, form);
    }

    private <T> Mono<T> convertAndCheckForm(Api api, Map<String, Object> arg, Class<T> cls) {
        T form = LibPrs.tFromMap(arg, cls);
        return checkForm(api, form).thenReturn(form);
    }

    private Mono<Map<String, Object>> grabBody(Api api) {
        return api.getBd(new TypeReference<Map<String, Object>>() {
        }).switchIfEmpty(Mono.error(new ErrAPI("data not provided", 400)));
    }

    // ? rate limit
    protected Mono<Void> limit(Api api, int limit, int minutes) {
        return rl.limit(api, limit, minutes);
    }

    // ? forms & data
    protected <T> Mono<T> checkBodyForm(Api api, Class<T> cls) {
        return grabBody(api).flatMap(body -> convertAndCheckForm(api, body, cls));
    }

    protected <T> Mono<T> checkMultipartForm(Api api, Class<T> cls) {
        Optional<Map<String, Object>> parsedFormData = api.getParsedForm();
        return Mono.defer(() -> parsedFormData.isPresent() ? Mono.just(parsedFormData.get()) : grabBody(api))
                .flatMap(mapArg -> convertAndCheckForm(api, mapArg, cls));
    }

    protected <T> Mono<T> checkQueryForm(Api api, Class<T> cls) {
        Optional<Map<String, Object>> parsedQuery = api.getParsedQuery();
        return Mono.defer(() -> !parsedQuery.isPresent() ? Mono.error(new ErrAPI("data not provided", 400))
                : convertAndCheckForm(api, parsedQuery.get(), cls));
    }

    // ? path & variables path
    protected Mono<UUID> withPathId(Api api) {
        if (!api.hasPathUUID())
            return Mono.error(new ErrAPI("invalid id", 400));
        return Mono.just(api.getPathVarId().get());
    }

    protected Mono<Void> isTarget(Api api, WebFilterChain chain, String path, Supplier<Mono<Void>> cb) {
        return !api.isSamePath("/api/v1" + path) ? chain.filter(api) : cb.get();
    }

    protected Mono<Void> isTarget(Api api, WebFilterChain chain, String path, HttpMethod method,
            Supplier<Mono<Void>> cb) {
        return !api.isSamePath("/api/v1" + path, method) ? chain.filter(api) : cb.get();
    }

    protected Mono<Void> isSubPathOf(Api api, WebFilterChain chain, String p, Supplier<Mono<Void>> cb) {
        return !api.isSubPathOf("/api/v1" + p) ? chain.filter(api) : cb.get();
    }

    protected Mono<Void> matchPath(Api api, WebFilterChain chain, String p, HttpMethod method,
            Supplier<Mono<Void>> cb) {
        return !api.matchPath("/api/v1" + p, method) ? chain.filter(api) : cb.get();
    }

}
