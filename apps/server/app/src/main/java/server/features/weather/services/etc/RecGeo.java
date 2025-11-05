package server.features.weather.services.etc;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import server.decorators.flow.ErrAPI;
import server.lib.data_structure.prs.LibPrs;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RecGeo(double lat, double lon, String country_code, String region) {

  public static RecGeo fromIpApiBody(Map<String, Object> map) {
    try {
      return new RecGeo(
          (double) map.get("latitude"),
          (double) map.get("longitude"),
          (String) map.get("country_code"),
          (String) map.get("region")

      );
    } catch (Exception err) {
      throw new ErrAPI("invalid arg geolocation");
    }
  }

  public Map<String, Object> mapForClient() {
    Map<String, Object> map = LibPrs.mapFormT(this);

    map.put("strategy", "spring");

    // Map<String, Object> testMap = Map.of(
    //     "region", "Bacău",
    //     "country_code", "RO",
    //     "lon", 26.5252663,
    //     "lat", 46.3227827,
    //     "strategy", "spring");

    // return testMap;
    return map;
  }
}
