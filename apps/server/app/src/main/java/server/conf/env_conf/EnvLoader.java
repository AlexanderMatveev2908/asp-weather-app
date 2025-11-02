package server.conf.env_conf;

import java.nio.file.Path;
import java.util.Properties;

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

            env.getPropertySources().addFirst(new PropertiesPropertySource("dotenv", props));

        } catch (ErrAPI err) {
            throw new ErrAPI(err.getMessage());
        }
    }
}
