package server.lib.data_structure.prs.sub;

import java.util.Base64;
import java.util.Map;

public class D_PrsB64 extends C_PrsHex {
  public static String utf8FromB64(String arg) {
    return utf8FromBinary(Base64.getDecoder().decode(arg));
  }

  public static Map<String, Object> mapFromB64(String arg) {
    String json = utf8FromB64(arg);
    return mapFromJson(json);
  }

  public static String b64FromMap(Map<String, Object> arg) {
    String json = jsonFromObj(arg);
    byte[] binary = binaryFromUtf8(json);
    byte[] binaryBase64 = Base64.getEncoder().encode(binary);

    return utf8FromBinary(binaryBase64);
  }

  public static String b64FromBinary(byte[] arg) {
    byte[] binaryBase64 = Base64.getEncoder().encode(arg);
    return utf8FromBinary(binaryBase64);
  }
}
