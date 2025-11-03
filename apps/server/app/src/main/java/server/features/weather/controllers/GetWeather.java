package server.features.weather.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.weather.services.WeatherSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class GetWeather {
  private final WeatherSvc weatherSvc;

  public Mono<ResponseEntity<ResAPI>> main(Api api) {
    return weatherSvc.main(api).flatMap(bodyWeather -> new ResAPI(200).data(bodyWeather).build());
  }
}
