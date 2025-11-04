package server.features.weather.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.weather.services.WeatherCitySvc;
import server.features.weather.services.WeatherCoordsSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class GetWeather {
  private final WeatherCoordsSvc weatherSvc;
  private final WeatherCitySvc cityCoordsSvc;

  public Mono<ResponseEntity<ResAPI>> byCoords(Api api) {
    return weatherSvc.main(api).flatMap(bodyWeather -> new ResAPI(200).data(bodyWeather).build());
  }

  public Mono<ResponseEntity<ResAPI>> byCity(Api api) {
    return cityCoordsSvc.main(api).flatMap(bodyCoords -> new ResAPI(200).data(bodyCoords).build());
  }
}
