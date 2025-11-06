package server.features.weather.services.weather_svc.sub;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import reactor.core.publisher.Mono;
import server.features.weather.paperwork.FormWeatherCoords;

public interface AirPollutionMng {
  abstract WebClient.Builder getWebClientBuilder();

  abstract UriBuilder commonBuildQuery(UriBuilder uriBuilder, FormWeatherCoords form);

  private WebClient getAirPollutionWebClient() {
    return getWebClientBuilder()
        .baseUrl("https://api.openweathermap.org/data/2.5/air_pollution")
        .build();
  }

  private URI buildQueryAirPollution(UriBuilder uriBuilder, FormWeatherCoords form) {
    return commonBuildQuery(uriBuilder, form).build();
  }

  default Mono<Map<String, Object>> callAirPollutionApi(FormWeatherCoords form) {
    return getAirPollutionWebClient().get().uri(uriBuilder -> buildQueryAirPollution(uriBuilder, form)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        });
  }
}
