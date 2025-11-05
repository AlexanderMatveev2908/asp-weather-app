package server.features.weather.services.etc;

import java.util.Map;

public record RecGeo(double lat, double lon) {

  public static RecGeo fromIpApiBody(Map<String, Object> map) {
    return new RecGeo((double) map.get("latitude"), (double) map.get("longitude"));
  }
}
