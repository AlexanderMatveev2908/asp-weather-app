package server.middleware.base_mdw.etc.services;

import java.time.Duration;
import java.util.UUID;

import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import io.lettuce.core.Range;
import io.lettuce.core.api.reactive.RedisReactiveCommands;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RD;
import server.conf.env_conf.EnvVars;
import server.conf.env_conf.etc.data_structure.EnvModeT;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;

@Component
@SuppressFBWarnings({ "EI2" })
public final class RateLimitSvc {
    private final RedisReactiveCommands<String, String> cmd;
    private final EnvVars envKeeper;

    public RateLimitSvc(RD rd, EnvVars envKeeper) {
        this.cmd = rd.getCmd();
        this.envKeeper = envKeeper;
    }

    private LimitData extractLimitData(Api api, Integer minutes) {
        long now = System.currentTimeMillis();
        long windowMs = Duration.ofMinutes(minutes).toMillis();

        String ip = api.getClientIp();
        String path = api.getPath();
        String method = api.getMethod().toString();

        String key = String.format("rl:%s:%s__%s", ip, path, method);
        String val = now + ":" + UUID.randomUUID();

        return new LimitData(now, windowMs, key, val);
    }

    private Mono<Long> getIpCount(LimitData data) {
        return cmd.zremrangebyscore(data.getKey(), Range.create(0, data.expired()))
                .then(cmd.zadd(data.getKey(), data.getNow(), data.getVal()))
                .then(cmd.zcard(data.getKey()))
                .flatMap(count -> cmd.pexpire(data.getKey(), data.getWindowMs() + 1).thenReturn(count));
    }

    private Mono<Void> withError(Api api, LimitData data) {
        return cmd.zrangeWithScores(data.getKey(), 0, 0).singleOrEmpty().flatMap(tuple -> {
            long oldest = (long) tuple.getScore();
            long resetMs = data.reset(oldest);

            api.addHeader("RateLimit-Reset", resetMs);

            return Mono.error(
                    new ErrAPI("🐹 Our hamster-powered server took a break — try again later!", 429));
        });
    }

    public Mono<Void> limit(Api api, int limit, int minutes) {
        if (envKeeper.getMode().equals(EnvModeT.TEST))
            return Mono.empty();

        LimitData data = extractLimitData(api, minutes);

        return getIpCount(data)
                .flatMap(count -> {
                    int remaining = Math.max(0, limit - count.intValue());

                    // ? method itself use String.valueOf on 2 arg
                    api.addHeader("RateLimit-Limit", limit);
                    api.addHeader("RateLimit-Remaining", remaining);
                    api.addHeader("RateLimit-Window", data.getWindowMs());

                    if (count < limit)
                        return Mono.empty();

                    return withError(api, data);
                });
    }

}

@Getter
@RequiredArgsConstructor
final class LimitData {
    private final long now;
    private final long windowMs;
    private final String key;
    private final String val;

    public long expired() {
        return now - windowMs;
    }

    public long reset(long oldest) {
        return Math.max(0, (windowMs - (now - oldest)));
    }
}