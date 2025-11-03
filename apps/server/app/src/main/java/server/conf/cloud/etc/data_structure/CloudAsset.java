package server.conf.cloud.etc.data_structure;

import java.util.Map;

import lombok.Data;
import server.decorators.flow.ErrAPI;

@Data
public final class CloudAsset {
    private final String publicId;
    private final String url;
    private final String resourceType;

    public static CloudAsset fromMap(Map<?, ?> arg) {

        try {
            CloudAsset asset = new CloudAsset((String) arg.get("public_id"),
                    (String) arg.get("secure_url"),
                    (String) arg.get("resource_type"));
            return asset;
        } catch (Exception err) {
            throw new ErrAPI("Invalid cloud asset shape");
        }
    }
}
