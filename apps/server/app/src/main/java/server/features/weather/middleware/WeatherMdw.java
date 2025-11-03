package server.features.weather.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeather;
import server.middleware.base_mdw.BaseMdw;

@SuppressFBWarnings({ "EI2" })
@Component
@RequiredArgsConstructor
public class WeatherMdw extends BaseMdw {

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/weather", () -> {
      return limit(api, 30, 15).then(checkQueryForm(api, FormWeather.class).then(
          chain.filter(api)));
    });
  }
}
