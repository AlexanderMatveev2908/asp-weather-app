package server.lib.data_structure.prs.sub;

import java.nio.charset.StandardCharsets;
import java.util.Map;

public class B_PrsUtf8 extends A_PrsBase {
  public static byte[] binaryFromUtf8(String arg) {
    return arg.getBytes(StandardCharsets.UTF_8);
  }

  public static String utf8FromBinary(byte[] arg) {
    return new String(arg, StandardCharsets.UTF_8);
  }

  public static byte[] binaryFromMap(Map<String, Object> arg) {
    return binaryFromUtf8(jsonFromObj(arg));
  }
}
