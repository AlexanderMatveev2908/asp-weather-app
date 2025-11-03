package server.decorators.flow.res_api.meta;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActT {
    OK("✅"),
    ERR("❌");

    private final String emj;

    public static String emjFromStatus(int status) {
        ActT act = (status >= 200 && status < 300) ? ActT.OK : ActT.ERR;
        return act.getEmj();
    }

}
