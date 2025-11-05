package server.features.weather.services.etc;

import java.util.Map;

import server.decorators.flow.ErrAPI;
import server.lib.data_structure.prs.LibPrs;

public record RecGeo(double lat, double lon, String countryCode, String region) {

  public static RecGeo fromIpApiBody(Map<String, Object> map) {
    try {
      return LibPrs.tFromMap(map, RecGeo.class);
    } catch (Exception err) {
      throw new ErrAPI("invalid arg geolocation");
    }
  }

  public Map<String, Object> mapForClient() {
    Map<String, Object> map = LibPrs.mapFormT(this);

    map.put("strategy", "spring");

    return map;
  }
}
