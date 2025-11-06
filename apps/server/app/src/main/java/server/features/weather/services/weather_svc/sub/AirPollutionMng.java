package server.features.weather.services.weather_svc.sub;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import reactor.core.publisher.Mono;
import server.features.weather.services.etc.RecGeo;

public interface AirPollutionMng {
  abstract WebClient.Builder getWebClientBuilder();

  abstract UriBuilder commonBuildQuery(UriBuilder uriBuilder, RecGeo geo);

  private WebClient getAirPollutionWebClient() {
    return getWebClientBuilder()
        .baseUrl("https://api.openweathermap.org/data/2.5/air_pollution")
        .build();
  }

  private URI buildQueryAirPollution(UriBuilder uriBuilder, RecGeo geo) {
    return commonBuildQuery(uriBuilder, geo).build();
  }

  default Mono<Map<String, Object>> callAirPollutionApi(RecGeo geo) {
    return getAirPollutionWebClient().get().uri(uriBuilder -> buildQueryAirPollution(uriBuilder, geo)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        });
  }
}
