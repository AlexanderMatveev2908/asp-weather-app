package server.features.weather.services.weather_svc.sub;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import reactor.core.publisher.Mono;
import server.features.weather.services.etc.RecGeo;

public interface WeatherMng {
  abstract WebClient.Builder getWebClientBuilder();

  abstract UriBuilder commonBuildQuery(UriBuilder uriBuilder, RecGeo geo);

  private WebClient getWeatherWebCLient() {
    return getWebClientBuilder().baseUrl("https://api.openweathermap.org/data/3.0/onecall").build();
  }

  private URI buildQueryWeather(UriBuilder uriBuilder, RecGeo geo) {
    return commonBuildQuery(uriBuilder, geo)
        .queryParam("exclude", "minutely,hourly").build();
  }

  default Mono<Map<String, Object>> callWeatherApi(RecGeo geo) {
    return getWeatherWebCLient().get().uri(uriBuilder -> buildQueryWeather(uriBuilder, geo)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        });
  }

}
