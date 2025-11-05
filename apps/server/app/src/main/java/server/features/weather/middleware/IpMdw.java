package server.features.weather.middleware;

import org.springframework.stereotype.Component;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.middleware.base_mdw.BaseMdw;
import org.springframework.http.HttpMethod;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Component
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public class IpMdw extends BaseMdw {

  private boolean isIpLocal(String ip) {
    return ip.startsWith("127.") ||
        ip.equals("::1") ||
        ip.startsWith("0:0:0:0:0:0:0:1");
  }

  @Override
  public Mono<Void> handle(Api api, WebFilterChain chain) {
    return isTarget(api, chain, "/weather/ip", HttpMethod.GET, () -> {
      return limit(api, 50, 15).then(Mono.defer(() -> {
        String ip = api.getClientIp();

        if (ip.equals("unknown"))
          return Mono.error(new ErrAPI("ip not available", 400));
        else if (isIpLocal(ip))
          return Mono.error(new ErrAPI("ip is of current machine", 400));

        return chain.filter(api);
      }));
    });
  }
}
