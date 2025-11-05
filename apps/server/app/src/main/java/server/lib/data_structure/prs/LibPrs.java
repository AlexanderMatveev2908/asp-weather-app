package server.lib.data_structure.prs;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import server.decorators.flow.ErrAPI;
import server.lib.data_structure.Jack;
import server.lib.data_structure.prs.sub.F_PrsCases;

public final class LibPrs extends F_PrsCases {

    public static <T> T tFormJson(String json, Class<T> cls) {
        Map<String, Object> map = mapFromJson(json);
        return tFromMap(map, cls);
    }

    public static <T> T tFromMap(Map<String, Object> map, Class<T> cls) {
        try {
            return Jack.mapper.convertValue(map, cls);
        } catch (Exception err) {
            err.printStackTrace();
            throw new ErrAPI("invalid form", 400);
        }
    }

    public static LinkedHashMap<String, Object> linkedMap(Object... kvp) {
        LinkedHashMap<String, Object> map = new LinkedHashMap<>();

        if (kvp.length % 2 != 0)
            throw new ErrAPI("passed odd pairs kv");

        for (int i = 0; i < kvp.length; i += 2)
            map.put((String) kvp[i], kvp[i + 1]);

        return map;
    }

    public static <T> Map<String, Object> mapFormT(T arg) {
        Map<String, Object> map = new HashMap<>();

        if (arg == null)
            return map;

        for (Field field : arg.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                map.put(field.getName(), field.get(arg));
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Failed to read field => " + field.getName(), e);
            }
        }

        return map;
    }

}
