package server.conf.env_conf;

import java.nio.file.Path;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;
import java.util.stream.Stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertiesPropertySource;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import server.decorators.flow.ErrAPI;
import server.lib.paths.Hiker;

public final class EnvLoader implements EnvironmentPostProcessor {

    @Override
    @SuppressWarnings("UseSpecificCatch")
    public void postProcessEnvironment(ConfigurableEnvironment env, SpringApplication app) {
        try {
            Path serverDir = Hiker.SERVER_DIR;

            Dotenv dotenv = Dotenv.configure()
                    .directory(serverDir.toString())
                    .filename(".env")
                    .ignoreIfMissing()
                    .load();

            Properties props = new Properties();
            var existingVars = dotenv.entries();
            for (DotenvEntry pair : existingVars)
                props.put(pair.getKey(), pair.getValue());

            String dbUrl = dotenv.get("DB_URL");
            String dbUs = dotenv.get("DB_US");
            String dbPwd = dotenv.get("DB_PWD");
            String supabaseCa = dotenv.get("SUPABASE_CA");

            if (Stream.of(dbUrl, dbUs, dbPwd).anyMatch(Objects::isNull)) {
                var missing = Stream.of(
                        Map.entry("DB_URL", dbUrl),
                        Map.entry("DB_US", dbUs),
                        Map.entry("DB_PWD", dbPwd),
                        Map.entry("SUPABASE_CA", supabaseCa))
                        .filter(el -> el.getValue() == null || el.getValue().isBlank())
                        .findFirst();

                missing.ifPresent(el -> {
                    throw new ErrAPI(
                            String.format("⚠️ %s key db cnt => %s", el.getValue() == null ? "missing" : "blank",
                                    el.getKey()));
                });

            }

            env.getPropertySources().addFirst(new PropertiesPropertySource("dotenv", props));

        } catch (ErrAPI err) {
            throw new ErrAPI(err.getMessage());
        }
    }
}
