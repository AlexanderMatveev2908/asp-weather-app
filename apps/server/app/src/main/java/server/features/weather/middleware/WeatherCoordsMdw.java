package server.features.weather.middleware;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeatherCoords;
import server.middleware.base_mdw.BaseMdw;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class WeatherCoordsMdw extends BaseMdw {

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/weather/coords", HttpMethod.GET, () -> {
      return limit(api, 50, 15).then(checkQueryForm(api, FormWeatherCoords.class).then(
          chain.filter(api)));
    });
  }
}
