package server.lib.data_structure.prs.sub;

import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;

import server.lib.data_structure.Jack;
import server.lib.dev.lib_log.LibLog;

public class A_PrsBase {

  public static String toJson(Object obj) {
    try {
      return Jack.mapper.writeValueAsString(obj);
    } catch (Exception err) {
      LibLog.logErr(err);
      return null;
    }
  }

  public static Map<String, Object> jsonToMap(String txt) {
    try {
      return Jack.mapper.readValue(txt, new TypeReference<Map<String, Object>>() {
      });
    } catch (Exception err) {
      LibLog.logErr(err);
      return null;
    }
  }
}
