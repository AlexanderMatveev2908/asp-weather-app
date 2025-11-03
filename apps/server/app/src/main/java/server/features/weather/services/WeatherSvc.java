package server.features.weather.services;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.env_conf.EnvVars;
import server.lib.dev.lib_log.LibLog;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class WeatherSvc {
  private final EnvVars envVars;

  private final WebClient.Builder webClientBuilder;

  private WebClient getWebCLient() {
    return webClientBuilder.baseUrl("https://api.openweathermap.org/data/3.0/onecall").build();
  }

  private String getApiKey() {
    return envVars.getWeatherApiKey();
  }

  private URI buildQuery(UriBuilder uriBuilder) {
    return uriBuilder
        .queryParam("lat", 50.00)
        .queryParam("lon", 50.00)
        .queryParam("exclude", "hourly")
        .queryParam("appid", getApiKey())
        .build();
  }

  public Mono<Map<String, Object>> main() {

    return getWebCLient().get().uri(uriBuilder -> buildQuery(uriBuilder)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        }).flatMap(body -> {

          return Mono.just(body);
        }).onErrorMap(err -> {

          LibLog.logErr(err);
          return err;
        });
  }
}
