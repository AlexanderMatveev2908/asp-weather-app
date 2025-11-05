package server.lib.data_structure;

import java.util.List;
import java.util.UUID;

import server.paperwork.Reg;

public final class LibShape {
    public static boolean hasText(Object val) {
        if (val instanceof String str)
            return !str.isBlank();

        return false;
    }

    public static boolean isV4(String arg) {
        try {
            var res = Reg.isUUID(arg);
            UUID.fromString(arg);

            return res;
        } catch (Exception err) {
            return false;
        }
    }

    public static boolean isList(Object arg) {
        if (arg instanceof List<?> argList)
            return !argList.isEmpty();

        return false;
    }
}
