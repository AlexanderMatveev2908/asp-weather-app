package server.lib.data_structure.prs.sub;

import java.util.HexFormat;
import java.util.Map;

public class C_PrsHex extends B_PrsUtf8 {
  public static String utf8FromHex(String txtHex) {
    byte[] utf8Bytes = HexFormat.of().parseHex(txtHex);
    return utf8FromBinary(utf8Bytes);
  }

  public static String hexFromBinary(byte[] arg) {
    return HexFormat.of().formatHex(arg);
  }

  public static byte[] binaryFromHex(String arg) {
    return HexFormat.of().parseHex(arg);
  }

  public static Map<String, Object> mapFromHex(String arg) {
    return mapFromJson(utf8FromHex(arg));
  }

  public static String hexFromMap(Map<String, Object> arg) {
    return hexFromBinary(binaryFromMap(arg));
  }
}
