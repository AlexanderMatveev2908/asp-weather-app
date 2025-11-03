package server.conf.cloud;

import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.conf.cloud.etc.sub.CloudSvcDelete;
import server.conf.cloud.etc.sub.CloudSvcUpload;
import server.conf.env_conf.EnvKeeper;
import server.decorators.flow.ErrAPI;
import server.lib.data_structure.parser.Prs;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2" })
public final class CloudSvc implements CloudSvcUpload, CloudSvcDelete {
    private final WebClient.Builder webClientBuilder;
    private final EnvKeeper envKeeper;

    // ? expected as abstract
    public EnvKeeper getEnvKeeper() {
        return envKeeper;
    }

    public WebClient getClient() {
        String cloudName = envKeeper.getCloudName();
        return webClientBuilder.baseUrl("https://api.cloudinary.com/v1_1/" + cloudName).build();
    }

    public String genSign(Map<String, String> params) {
        String cloudSecret = envKeeper.getCloudSecret();

        String strParams = params.entrySet().stream().sorted(Map.Entry.comparingByKey())
                .map(el -> el.getKey() + "=" + el.getValue()).collect(Collectors.joining("&")) + cloudSecret;

        return sign(strParams);
    }

    // ? private methods
    private String sign(String params) {
        try {
            MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
            byte[] digest = sha1.digest(Prs.utf8ToBinary(params));
            String sig = HexFormat.of().formatHex(digest);

            return sig;
        } catch (Exception err) {
            throw new ErrAPI("err creating cloud sign");
        }
    }

}
