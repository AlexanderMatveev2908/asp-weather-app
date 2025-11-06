package server.features.weather.services.weather_svc;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.Builder;
import org.springframework.web.util.UriBuilder;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;
import server.conf.env_conf.EnvVars;
import server.decorators.flow.api.Api;
import server.features.weather.paperwork.FormWeatherCoords;
import server.features.weather.services.etc.BaseWeatherSvc;
import server.features.weather.services.weather_svc.sub.AirPollutionMng;
import server.features.weather.services.weather_svc.sub.WeatherMng;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.lib_log.LibLog;

@Service
@SuppressFBWarnings({ "EI2" })
public class WeatherAirPollutionSvc extends BaseWeatherSvc implements WeatherMng, AirPollutionMng {

  public WeatherAirPollutionSvc(EnvVars envVars, WebClient.Builder webClientBuilder, RdCmd rdCmd) {
    super(webClientBuilder, rdCmd, envVars);
  }

  // ? expected to be present
  @Override
  public Builder getWebClientBuilder() {
    return webClientBuilder;
  }

  public UriBuilder commonBuildQuery(UriBuilder uriBuilder, FormWeatherCoords form) {
    return uriBuilder
        .queryParam("lat", form.getLat())
        .queryParam("lon", form.getLon())
        .queryParam("appid", getApiKey());
  }

  private String asRedisKey(Double val) {
    return String.format("%.6f", val);
  }

  private String buildWeatherKey(FormWeatherCoords form) {
    return "weather_&_air_pollution__" + asRedisKey(form.getLat()) + "__" + asRedisKey(form.getLon());
  }

  private Mono<Boolean> saveInRd(FormWeatherCoords form, Map<String, Object> body) {
    String key = buildWeatherKey(form);
    String json = LibPrs.jsonFromObj(body);

    return rdCmd.setStr(key, json).then(rdCmd.expire(key, 30));
  }

  private Mono<Map<String, Object>> firstLookRd(FormWeatherCoords form) {
    String key = buildWeatherKey(form);

    return rdCmd.getStr(key).map(json -> {
      Map<String, Object> weatherDict = LibPrs.mapFromJson(json);
      return weatherDict;
    });
  }

  public Mono<Map<String, Object>> main(Api api, FormWeatherCoords formCoords) {
    FormWeatherCoords form = formCoords != null ? formCoords : api.getMappedData();

    return firstLookRd(form).switchIfEmpty(
        callWeatherApi(form)).flatMap(bodyWeather -> callAirPollutionApi(form).flatMap(bodyPollution -> {
          Map<String, Object> merged = new HashMap<>();
          merged.putAll(bodyWeather);
          merged.put("airPollution", bodyPollution);

          if (merged.get("minutely") != null)
            merged.remove("minutely");

          return saveInRd(form, merged).thenReturn(merged);
        }).onErrorMap(err -> {
          LibLog.logErr(err);
          return err;
        }));
  }
}
