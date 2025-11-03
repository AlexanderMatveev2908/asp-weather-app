package server.features.test.middleware;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.middleware.base_mdw.BaseMdw;

@Component
public class GetLimitedMdw extends BaseMdw {
    @Override
    public Mono<Void> handle(Api api, WebFilterChain chain) {
        return isTarget(api, chain, "/test/limited", HttpMethod.GET, () -> {
            return limit(api, 3, 15).then(chain.filter(api));
        });
    }
}
