package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;

import lombok.RequiredArgsConstructor;
import server.decorators.LifeSpawn;
import server.lib.dev.lib_log.LibLog;

@SpringBootApplication
@ConfigurationPropertiesScan
@RequiredArgsConstructor
public class ServerApplication {

    private final LifeSpawn lifeSpawn;

    public static void main(String[] args) {

        try {
            SpringApplication.run(ServerApplication.class, args);
        } catch (Exception err) {
            LibLog.logErr(err);
        }
    }

    @Bean
    ApplicationListener<WebServerInitializedEvent> startCheck() {
        return e -> {

            try {
                lifeSpawn.lifeCheck(e);
            } catch (Exception err) {
                LibLog.logErr(err);
            }

        };
    }

}
