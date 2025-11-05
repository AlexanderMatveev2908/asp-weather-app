package server.features.weather.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeatherCity;
import server.middleware.base_mdw.BaseMdw;
import org.springframework.http.HttpMethod;

@Component
@RequiredArgsConstructor
public class WeatherCityMdw extends BaseMdw {

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/weather/city", HttpMethod.GET, () -> {
      return limit(api, 50, 15).then(checkQueryForm(api, FormWeatherCity.class).then(chain.filter(api)));
    });
  }
}
