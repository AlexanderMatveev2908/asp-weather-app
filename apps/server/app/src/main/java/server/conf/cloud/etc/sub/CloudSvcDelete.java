package server.conf.cloud.etc.sub;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import reactor.core.publisher.Mono;
import server.conf.env_conf.EnvVars;
import server.lib.dev.lib_log.LibLog;

public interface CloudSvcDelete {

  public abstract String genSign(Map<String, String> params);

  public abstract EnvVars getEnvKeeper();

  public abstract WebClient getClient();

  private String getSignDelete(String tmsp, String publicId) {
    Map<String, String> params = new HashMap<>();
    params.put("timestamp", tmsp);
    params.put("public_id", publicId);

    return genSign(params);

  }

  private DeleteData extractDeleteData(String publicId, String resourceType) {
    String cloudKey = getEnvKeeper().getCloudKey();
    String tmsp = String.valueOf(Instant.now().getEpochSecond());

    String url = "/" + resourceType + "/destroy";

    return new DeleteData(cloudKey, tmsp, publicId, url);
  }

  private MultipartBodyBuilder buildForm(DeleteData deleteData) {
    MultipartBodyBuilder form = new MultipartBodyBuilder();
    form.part("api_key", deleteData.getCloudKey());
    form.part("public_id", deleteData.getPublicId());
    form.part("timestamp", deleteData.getTmsp());
    form.part("signature", getSignDelete(deleteData.getTmsp(), deleteData.getPublicId()));

    return form;
  }

  default Mono<Integer> delete(String publicId, String resourceType) {
    DeleteData deleteData = extractDeleteData(publicId, resourceType);
    MultipartBodyBuilder form = buildForm(deleteData);

    return getClient().post().uri(deleteData.getUrl()).contentType(MediaType.MULTIPART_FORM_DATA)
        .body(BodyInserters.fromMultipartData(form.build())).retrieve().bodyToMono(Map.class)
        .flatMap(map -> {
          String result = map.get("result").toString();
          int count = "ok".equals(result) ? 1 : 0;
          LibLog.log(String.format("✂️ deleted %d %s", count, resourceType));
          return Mono.just(count);
        });
  }
}

@RequiredArgsConstructor
@SuperBuilder
@Getter
class DeleteData {

  private final String cloudKey;
  private final String tmsp;
  private final String publicId;
  private final String url;

}