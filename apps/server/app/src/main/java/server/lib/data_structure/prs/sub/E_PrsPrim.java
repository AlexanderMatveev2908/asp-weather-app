package server.lib.data_structure.prs.sub;

import java.util.Optional;

import server.decorators.flow.ErrAPI;
import server.lib.data_structure.LibShape;

public class E_PrsPrim extends D_PrsB64 {

  public static Optional<String> fromAnyToStr(Object arg) {
    return LibShape.hasText(arg) ? Optional.of((String) arg) : Optional.empty();
  }

  public static long fromAnyToLong(Object arg) {
    if (arg == null)
      throw new ErrAPI("expected string or number received null");

    if (arg instanceof Number num)
      return num.longValue();

    if (arg instanceof String str)
      return Long.parseLong(str);

    throw new ErrAPI("unknown arg type");
  }
}
