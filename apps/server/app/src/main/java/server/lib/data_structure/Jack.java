package server.lib.data_structure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;

public class Jack {
  public static final ObjectMapper mapper = JsonMapper.builder().enable(SerializationFeature.INDENT_OUTPUT)
      .addModule(new Jdk8Module()).build();

}
