package server.lib.data_structure.prs.sub;

import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;

import server.lib.dev.lib_log.LibLog;

public class A_PrsBase {
  protected static final ObjectMapper jack = JsonMapper.builder().enable(SerializationFeature.INDENT_OUTPUT)
      .addModule(new Jdk8Module()).configure(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY, false).build();

  public static String toJson(Object obj) {
    try {
      return jack.writeValueAsString(obj);
    } catch (Exception err) {
      LibLog.logErr(err);
      return null;
    }
  }

  public static Map<String, Object> jsonToMap(String txt) {
    try {
      return jack.readValue(txt, new TypeReference<Map<String, Object>>() {
      });
    } catch (Exception err) {
      LibLog.logErr(err);
      return null;
    }
  }
}
