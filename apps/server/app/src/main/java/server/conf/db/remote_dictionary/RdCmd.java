package server.conf.db.remote_dictionary;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import io.lettuce.core.ScoredValue;
import io.lettuce.core.api.reactive.RedisReactiveCommands;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Service
public final class RdCmd {
    private final RedisReactiveCommands<String, String> cmd;

    public RdCmd(RD rd) {
        this.cmd = rd.getCmd();
    }

    public Mono<Integer> delK(String k) {
        return cmd.del(k).flatMap(v -> {
            if (v == 0)
                return Mono.error(new ErrAPI("key not found => " + k, 404));

            return Mono.just(v.intValue());
        }).doOnNext(v -> LibLog.log("🔪 deleted " + v + " key"));
    }

    public Mono<String> typeOf(String key) {
        return cmd.type(key).switchIfEmpty(Mono.error(new ErrAPI("key not found => " + key, 404)))
                .doOnNext(type -> LibLog.logKV(key, type));
    }

    public Mono<Boolean> expire(String key, int minutes) {
        return cmd.expire(key, Duration.ofMinutes(minutes));
    }

    public Mono<String> setStr(String k, String v) {
        return cmd.set(k, v);
    }

    public Mono<String> getStr(String k) {
        return cmd.get(k);
    }

    public Mono<String> setHash(String k, Map<String, String> m) {
        return cmd.hmset(k, m);
    }

    public Mono<String> getHash(String k, String v) {
        return cmd.hget(k, v);
    }

    public Mono<Integer> appendList(String k, String... v) {
        return cmd.rpush(k, v).map(Long::intValue);
    }

    public Mono<List<String>> getList(String k, int start, int end) {
        return cmd.lrange(k, start, end).collectList();
    }

    public Mono<Integer> addToSet(String k, String... v) {
        return cmd.sadd(k, v).map(Long::intValue);
    }

    public Mono<List<String>> getSet(String k) {
        return cmd.smembers(k).collectList();
    }

    public Mono<Integer> addToScoredSet(String k, Map<String, Double> m) {
        return Flux.fromIterable(m.entrySet()).flatMap(entry -> cmd.zadd(k, entry.getValue(), entry.getKey())).reduce(0,
                (acc, curr) -> acc + curr.intValue());
    }

    public Mono<List<ScoredValue<String>>> getScoredSet(String k, int start, int end) {
        return cmd.zrangeWithScores(k, start, end).collectList();
    }

    public Mono<Object> grabAll() {
        return cmd.keys("*").flatMap(key -> cmd.type(key).flatMap(type -> switch (type.toLowerCase()) {
            case "string" -> cmd.get(key).map(val -> Map.entry(key, val));

            case "hash" -> cmd.hgetall(key).collectMap(kv -> kv.getKey(), kv -> kv.getValue())
                    .map(map -> Map.entry(key, LibPrs.jsonFromObj(map)));

            case "list" -> cmd.lrange(key, 0, -1).collectList().map(list -> Map.entry(key, LibPrs.jsonFromObj(list)));

            case "set" -> cmd.smembers(key).collectList().map(list -> Map.entry(key, LibPrs.jsonFromObj(list)));

            case "zset" -> cmd.zrange(key, 0, -1).collectList().map(list -> Map.entry(key, LibPrs.jsonFromObj(list)));

            default -> Mono.empty();
        })).collectMap(Map.Entry::getKey, Map.Entry::getValue).map(res -> {
            System.out.println("🗃️ rd cache => ");
            res.forEach((k, v) -> LibLog.logKV(k, v));
            return res;
        });
    }

    public Mono<String> flushAll() {
        return cmd.flushall().map(res -> {
            if (!"OK".equals(res))
                throw new ErrAPI("rd flush all failed");

            LibLog.log("🔪 rd cleaned");

            return res;
        }).onErrorMap(err -> new ErrAPI("rd flush all failed"));
    }
}
