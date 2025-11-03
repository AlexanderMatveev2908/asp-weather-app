package server.features.weather.services;

import java.net.URI;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;
import server.conf.env_conf.EnvVars;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeather;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class WeatherSvc {
  private final EnvVars envVars;
  private final RdCmd rdCmd;
  private final WebClient.Builder webClientBuilder;

  private WebClient getWebCLient() {
    return webClientBuilder.baseUrl("https://api.openweathermap.org/data/3.0/onecall").build();
  }

  private String getApiKey() {
    return envVars.getWeatherApiKey();
  }

  private URI buildQuery(UriBuilder uriBuilder, FormWeather form) {
    return uriBuilder
        .queryParam("lat", form.getLat())
        .queryParam("lon", form.getLon())
        .queryParam("exclude", "hourly")
        .queryParam("appid", getApiKey())
        .build();
  }

  private String asRedisKey(Double val) {
    return String.format("%.4f", val);
  }

  private String buildWeatherKey(FormWeather form) {
    return "weather__" + asRedisKey(form.getLat()) + "__" + asRedisKey(form.getLon());
  }

  private Mono<Boolean> saveInRd(FormWeather form, Map<String, Object> body) {
    String key = buildWeatherKey(form);
    String json = LibPrs.jsonFromObj(body);

    return rdCmd.setStr(key, json).then(rdCmd.expire(key, 60));
  }

  private Mono<Map<String, Object>> firstLookRd(FormWeather form) {
    String key = buildWeatherKey(form);

    return rdCmd.getStr(key).map(json -> {
      Map<String, Object> weatherDict = LibPrs.mapFromJson(json);
      return weatherDict;
    });
  }

  private Mono<Map<String, Object>> callWeatherApi(FormWeather form) {
    return getWebCLient().get().uri(uriBuilder -> buildQuery(uriBuilder, form)).retrieve()
        .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
        });
  }

  public Mono<Map<String, Object>> main(Api api) {

    FormWeather form = api.getMappedData();

    return firstLookRd(form).switchIfEmpty(
        callWeatherApi(form)).flatMap(body -> {
          return saveInRd(form, body).thenReturn(body);
        }).onErrorMap(err -> {
          LibLog.logErr(err);
          return err;
        });
  }
}
