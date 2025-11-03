package server.lib.dev.lib_log;

import server.lib.dev.lib_log.sub.C_LibLogErr;

public final class LibLog extends C_LibLogErr {

    public static void logKV(String key, Object val) {
        System.out.printf("🔑 %s => 🖍️ %s%n", key, val);
    }

}
