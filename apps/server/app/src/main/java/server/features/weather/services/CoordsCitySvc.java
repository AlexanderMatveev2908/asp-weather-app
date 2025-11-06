package server.features.weather.services;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;
import server.conf.env_conf.EnvVars;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeatherCity;
import server.features.weather.services.etc.BaseWeatherSvc;
import server.features.weather.services.etc.RecGeo;
import server.lib.data_structure.prs.LibPrs;

@Service
@SuppressFBWarnings({ "EI2" })
public class CoordsCitySvc extends BaseWeatherSvc {

  public CoordsCitySvc(EnvVars envVars, WebClient.Builder webClientBuilder, RdCmd rdCmd) {
    super(webClientBuilder, rdCmd, envVars);
  }

  private WebClient getWebClient() {
    return webClientBuilder.baseUrl("http://api.openweathermap.org/geo/1.0/direct").build();
  }

  private URI buildURI(UriBuilder uriBuilder, FormWeatherCity form) {
    return uriBuilder.queryParam("q", form.getCity()).queryParam("appid", getApiKey()).queryParam("limit", 1).build();
  }

  private String buildKey(String city) {
    return "geo_city__" + city.replaceAll("\\s+", "_");
  }

  private Mono<RecGeo> firstLookRd(FormWeatherCity form) {
    return rdCmd.getStr(buildKey(form.getCity())).map(json -> LibPrs.tFormJson(json, RecGeo.class));
  }

  private Mono<RecGeo> callWeatherGeoApi(FormWeatherCity form) {
    return getWebClient().get().uri(uriBuilder -> buildURI(uriBuilder, form)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {
        }).flatMap(body -> {

          if (body.size() < 1)
            throw new ErrAPI("city coords not found", 404);

          Map<String, Object> firstRes = body.get(0);

          RecGeo geo = RecGeo.fromWeatherApiBody(firstRes);
          String json = LibPrs.jsonFromObj(geo);

          return rdCmd.setStr(buildKey(form.getCity()), json).thenReturn(geo);
        });
  }

  public Mono<RecGeo> main(Api api) {
    FormWeatherCity form = api.getMappedData();

    return firstLookRd(form).switchIfEmpty(callWeatherGeoApi(form));
  }
}
