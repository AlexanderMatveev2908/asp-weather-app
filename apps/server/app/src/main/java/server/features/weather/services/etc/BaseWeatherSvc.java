package server.features.weather.services.etc;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.conf.env_conf.EnvVars;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class BaseWeatherSvc {
  protected final WebClient.Builder webClientBuilder;
  private final EnvVars envVars;

  protected String getApiKey() {
    return envVars.getWeatherApiKey();
  }

}
