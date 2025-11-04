package server.features.weather.services.etc;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;
import server.conf.env_conf.EnvVars;

@Service
@RequiredArgsConstructor
public class BaseWeatherSvc {
  private final EnvVars envVars;
  protected final WebClient.Builder webClientBuilder;

  protected String getApiKey() {
    return envVars.getWeatherApiKey();
  }

}
