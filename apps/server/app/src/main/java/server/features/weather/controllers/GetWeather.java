package server.features.weather.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.weather.services.IpSvc;
import server.features.weather.services.WeatherCitySvc;
import server.features.weather.services.WeatherCoordsSvc;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class GetWeather {
  private final WeatherCoordsSvc weatherSvc;
  private final WeatherCitySvc cityCoordsSvc;
  private final IpSvc geoSvc;

  public Mono<ResponseEntity<ResAPI>> weatherByCoords(Api api) {
    return weatherSvc.main(api, null).flatMap(bodyWeather -> new ResAPI(200).data(bodyWeather).build());
  }

  public Mono<ResponseEntity<ResAPI>> weatherByCity(Api api) {
    return cityCoordsSvc.main(api).flatMap(
        formCoords -> weatherSvc.main(api, formCoords)
            .flatMap(bodyWeather -> new ResAPI(200).data(bodyWeather).build()));
  }

  public Mono<ResponseEntity<ResAPI>> coordsByIp(Api api) {
    return geoSvc.main(api).flatMap(rec -> new ResAPI(200).data(Map.of("coords", rec)).build());
  }
}
