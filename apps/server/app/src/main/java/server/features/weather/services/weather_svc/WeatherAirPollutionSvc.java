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
import server.features.weather.services.etc.BaseWeatherSvc;
import server.features.weather.services.etc.RecGeo;
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

  public UriBuilder commonBuildQuery(UriBuilder uriBuilder, RecGeo geo) {
    return uriBuilder
        .queryParam("lat", geo.lat())
        .queryParam("lon", geo.lon())
        .queryParam("appid", getApiKey());
  }

  private String asRedisKey(Double val) {
    return String.format("%.6f", val);
  }

  private String buildWeatherKey(RecGeo geo) {
    return "weather_&_air_pollution__" + asRedisKey(geo.lat()) + "__" + asRedisKey(geo.lon());
  }

  private Mono<Boolean> saveInRd(RecGeo geo, Map<String, Object> body) {
    String key = buildWeatherKey(geo);
    String json = LibPrs.jsonFromObj(body);

    return rdCmd.setStr(key, json).then(rdCmd.expire(key, 30));
  }

  private Mono<Map<String, Object>> firstLookRd(RecGeo geo) {
    String key = buildWeatherKey(geo);

    return rdCmd.getStr(key).map(json -> {
      Map<String, Object> weatherDict = LibPrs.mapFromJson(json);
      return weatherDict;
    });
  }

  public Mono<Map<String, Object>> main(Api api, RecGeo geo) {

    return firstLookRd(geo).switchIfEmpty(
        callWeatherApi(geo)).flatMap(bodyWeather -> callAirPollutionApi(geo).flatMap(bodyPollution -> {
          Map<String, Object> merged = new HashMap<>();
          merged.putAll(bodyWeather);
          merged.put("airPollution", bodyPollution);
          merged.put("coords", geo);

          if (merged.get("minutely") != null)
            merged.remove("minutely");

          return saveInRd(geo, merged).thenReturn(merged);
        }).doOnError(err -> {
          LibLog.logErr(err);
        }));
  }
}
