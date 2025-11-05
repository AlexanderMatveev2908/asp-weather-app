package server.features.weather;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.weather.controllers.GetWeather;
import server.router.RouterAPI;

@SuppressFBWarnings({ "EI2" })
@RouterAPI("/api/v1/weather")
@RequiredArgsConstructor
public class WeatherRouter {
  private final GetWeather getCtrl;

  @GetMapping("/coords")
  public Mono<ResponseEntity<ResAPI>> weatherByCoords(Api api) {
    return getCtrl.weatherByCoords(api);
  }

  @GetMapping("/city")
  public Mono<ResponseEntity<ResAPI>> weatherByCity(Api api) {
    return getCtrl.weatherByCity(api);
  }

  @GetMapping("/ip")
  public Mono<ResponseEntity<ResAPI>> coordsByIp(Api api) {
    return getCtrl.coordsByIp(api);
  }
}
