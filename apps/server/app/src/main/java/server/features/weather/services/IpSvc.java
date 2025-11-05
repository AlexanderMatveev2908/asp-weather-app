package server.features.weather.services;

import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import reactor.core.publisher.Mono;
import server.conf.db.remote_dictionary.RdCmd;
import server.conf.env_conf.EnvVars;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.features.weather.services.etc.BaseWeatherSvc;
import server.features.weather.services.etc.RecGeo;
import server.lib.data_structure.prs.LibPrs;

@Service
@SuppressFBWarnings({ "EI2" })
public class IpSvc extends BaseWeatherSvc {

  public IpSvc(EnvVars envVars, WebClient.Builder webClientBuilder, RdCmd rdCmd) {
    super(webClientBuilder, rdCmd, envVars);
  }

  private WebClient getWebClient() {
    return webClientBuilder.baseUrl("https://ipwho.is").build();
  }

  private String buildKey(String ip) {
    return "geo__" + ip;
  }

  private Mono<RecGeo> firstLookRd(String ip) {
    return rdCmd.getStr(buildKey(ip)).map(json -> LibPrs.tFormJson(json, RecGeo.class));
  }

  private Mono<RecGeo> callIpApi(String ip) {
    String url = "/" + ip;

    return getWebClient().get().uri(url).retrieve().bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
    }).flatMap(body -> {
      RecGeo rec = RecGeo.fromIpApiBody(body);
      String geoKey = buildKey(ip);

      return rdCmd.setStr(geoKey, LibPrs.jsonFromObj(rec)).thenReturn(rec);
    });
  }

  public Mono<RecGeo> main(Api api) {
    String ip = api.getClientIp();

    return firstLookRd(ip).switchIfEmpty(callIpApi(ip)).onErrorMap(err -> {
      return new ErrAPI("error retrieving ip");
    });
  }
}
