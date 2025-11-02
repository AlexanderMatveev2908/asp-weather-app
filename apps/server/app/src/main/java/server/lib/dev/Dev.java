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
import server.conf.db.database.DB;
import server.conf.db.remote_dictionary.RdCmd;
import server.lib.security.tfa.totp.MyTotp;
import server.models.applications.JobAppl;
import server.models.applications.etc.JobApplStatusT;
import server.models.applications.svc.JobApplRepo;
import server.models.user.User;
import server.models.user.svc.UserSvc;

@SuppressWarnings({ "unused", "UseSpecificCatch", "CallToPrintStackTrace" })
@SuppressFBWarnings({
        "EI2" })
@Service
@RequiredArgsConstructor
public class Dev {
    // private final RdCmd cmd;
    private static final Faker faker = new Faker();
    private final DB db;
    private final RdCmd cmd;
    private final MyTotp totp;
    private final UserSvc userSvc;
    private final JobApplRepo jobRepo;

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

    private Mono<List<JobAppl>> myApplications(User us) {

        List<Mono<JobAppl>> promises = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            JobApplStatusT[] statuses = JobApplStatusT.values();
            JobApplStatusT randomStatus = statuses[ThreadLocalRandom.current().nextInt(statuses.length)];

            promises.add(this.jobRepo.insert(
                    new JobAppl(us.getId(), faker.company().name(), faker.job().position(), randomStatus, randomDate(),
                            faker.lorem().sentence())));
        }

        return Flux.merge(promises).collectList();
    }

    public void mng() {
        userSvc.findByEmail("matveevalexander470@gmail.com").flatMap(us -> {
            return myApplications(us);
        }).switchIfEmpty(Mono.defer(() -> {
            MyLog.logTtl("user supposed to exists");

            return Mono.empty();
        })).doOnSuccess(res -> {
            if (res != null)
                MyLog.logTtl("success mock data", res);
        }).subscribe();
    }

    public void dropAll() {
        db.truncateAll().flatMap(count -> {
            return cmd.flushAll();
        }).subscribe();
    }

}
