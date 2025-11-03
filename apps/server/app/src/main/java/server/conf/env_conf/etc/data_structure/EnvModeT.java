package server.conf.env_conf.etc.data_structure;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import server.decorators.flow.ErrAPI;

@Getter
@RequiredArgsConstructor
public enum EnvModeT {
    DEV("development"),
    TEST("test"),
    PROD("production");

    private final String val;

    public static EnvModeT fromValue(String val) {
        for (EnvModeT mode : values())
            if (mode.val.equalsIgnoreCase(val))
                return mode;

        throw new ErrAPI("Invalid mode => " + val);
    }
}