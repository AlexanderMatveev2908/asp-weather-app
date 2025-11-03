package server.conf.env_conf;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import server.conf.env_conf.etc.data_structure.EnvModeT;
import server.conf.env_conf.etc.paperwork.Resolved;

@Data
@Validated
@ConfigurationProperties(prefix = "app")
public final class EnvVars {

    @NotBlank
    @Resolved
    private String appName;

    @NotBlank
    @Resolved
    private String envMode;
    @NotBlank
    @Resolved
    private String backUrl;
    @NotBlank
    @Resolved
    private String backUrlDev;
    @NotBlank
    @Resolved
    private String backUrlTest;
    @NotBlank
    @Resolved
    private String frontUrl;
    @NotBlank
    @Resolved
    private String frontUrlDev;
    @NotBlank
    @Resolved
    private String frontUrlTest;

    @NotBlank
    @Resolved
    private String cloudName;
    @NotBlank
    @Resolved
    private String cloudKey;
    @NotBlank
    @Resolved
    private String cloudSecret;

    @NotBlank
    @Resolved
    private String weatherApiKey;

    @NotBlank
    @Resolved
    private String redisUrl;

    public EnvModeT getMode() {
        return EnvModeT.fromValue(this.envMode);
    }

    public String getFrontUrl() {
        return switch (getMode()) {
            case DEV -> frontUrlDev;
            case TEST -> frontUrlTest;
            case PROD -> frontUrl;
        };
    }

    public String getBackUrl() {
        return switch (getMode()) {
            case DEV -> backUrlDev;
            case TEST -> backUrlTest;
            case PROD -> backUrl;
        };
    }

}