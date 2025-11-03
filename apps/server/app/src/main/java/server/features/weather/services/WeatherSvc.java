package server.features.weather.services;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class WeatherSvc {
  public Mono<Void> example() {

    return Mono.empty();
  }
}
