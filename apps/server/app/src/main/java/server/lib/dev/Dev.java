package server.lib.dev;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;

@SuppressWarnings({ "unused", "UseSpecificCatch", "CallToPrintStackTrace" })
@SuppressFBWarnings({
        "EI2" })
@Service
@RequiredArgsConstructor
public class Dev {
    // private final RdCmd cmd;
    private static final Faker faker = new Faker();
    private final RdCmd cmd;

    // @Bean
    // public ApplicationRunner logRoutes(RequestMappingHandlerMapping mapping) {
    // return args -> {
    // mapping.getHandlerMethods().forEach((k, v) -> {
    // System.out.println("📡 " + k + " => " + v);
    // });
    // };
    // }

    private long randomDate() {
        long now = System.currentTimeMillis();
        long oneYearMillis = TimeUnit.DAYS.toMillis(365);

        return now + ThreadLocalRandom.current().nextLong(-oneYearMillis, 0);
    }

    public void mng() {
    }

}
