package server.features.weather.services;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;
import server.conf.env_conf.EnvVars;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeatherCoords;
import server.features.weather.services.etc.BaseWeatherSvc;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Service
@SuppressFBWarnings({ "EI2" })
public class WeatherCoordsSvc extends BaseWeatherSvc {
  private final RdCmd rdCmd;

  public WeatherCoordsSvc(EnvVars envVars, WebClient.Builder webClientBuilder, RdCmd rdCmd) {
    super(envVars, webClientBuilder);
    this.rdCmd = rdCmd;
  }

  private WebClient getWebCLient() {
    return webClientBuilder.baseUrl("https://api.openweathermap.org/data/3.0/onecall").build();
  }

  private URI buildQuery(UriBuilder uriBuilder, FormWeatherCoords form) {
    return uriBuilder
        .queryParam("lat", form.getLat())
        .queryParam("lon", form.getLon())
        .queryParam("exclude", "minutely,hourly")
        .queryParam("appid", getApiKey())
        .build();
  }

  private String asRedisKey(Double val) {
    return String.format("%.4f", val);
  }

  private String buildWeatherKey(FormWeatherCoords form) {
    return "weather__" + asRedisKey(form.getLat()) + "__" + asRedisKey(form.getLon());
  }

  private Mono<Boolean> saveInRd(FormWeatherCoords form, Map<String, Object> body) {
    String key = buildWeatherKey(form);
    String json = LibPrs.jsonFromObj(body);

    return rdCmd.setStr(key, json).then(rdCmd.expire(key, 60));
  }

  private Mono<Map<String, Object>> firstLookRd(FormWeatherCoords form) {
    String key = buildWeatherKey(form);

    return rdCmd.getStr(key).map(json -> {
      Map<String, Object> weatherDict = LibPrs.mapFromJson(json);
      return weatherDict;
    });
  }

  private Mono<Map<String, Object>> callWeatherApi(FormWeatherCoords form) {
    return getWebCLient().get().uri(uriBuilder -> buildQuery(uriBuilder, form)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        });
  }

  public Mono<Map<String, Object>> main(Api api, FormWeatherCoords formCoords) {
    FormWeatherCoords form = formCoords != null ? formCoords : api.getMappedData();

    return firstLookRd(form).switchIfEmpty(
        callWeatherApi(form)).flatMap(body -> {

          if (body.get("minutely") != null)
            body.remove("minutely");

          return saveInRd(form, body).thenReturn(body);
        }).onErrorMap(err -> {
          LibLog.logErr(err);
          return err;
        });
  }
}
