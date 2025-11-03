package server.middleware.err_mng.etc;

import java.util.Optional;

import org.springframework.web.server.ServerWebExchange;

import server.decorators.flow.ErrAPI;
import server.paperwork.Reg;

public final record RecMetaErr(String msg, int status) {

  private static String getMsgFromErr(Throwable err, String originalMsg) {
    return Reg.isFirstCharEmoji(originalMsg) ? originalMsg
        : String.format("%s %s", err instanceof ErrAPI ? "❌" : "💣", originalMsg);
  }

  private static int getStatusFromErr(Throwable err) {
    return err instanceof ErrAPI errInst ? errInst.getStatus() : 500;
  }

  public static RecMetaErr fromErr(ServerWebExchange exc, Throwable err) {
    String originalMsg = Optional.ofNullable(err.getMessage()).orElse("");
    RouteFlags flags = RouteFlags.fromMsg(originalMsg);

    return flags.isRouteIssue() ? new RecMetaErr(flags.getRouteErrMsg(exc), flags.getRouteErrStatus())
        : new RecMetaErr(getMsgFromErr(err, originalMsg), getStatusFromErr(err));
  }
}

final record RouteFlags(boolean isRouteNotFound, boolean isMethodNotAllowed) {
  public static RouteFlags fromMsg(String msg) {
    boolean isRouteNotFound = msg.contains("404 NOT_FOUND");
    boolean isMethodNotAllowed = msg.contains("405 METHOD_NOT_ALLOWED");
    return new RouteFlags(isRouteNotFound, isMethodNotAllowed);
  }

  public boolean isRouteIssue() {
    return isRouteNotFound || isMethodNotAllowed;
  }

  public String getRouteErrMsg(ServerWebExchange exc) {
    String endpoint = exc.getRequest().getPath().value();
    return isRouteNotFound ? String.format("❌ route %s not found 🚦", endpoint)
        : String.format("❌ route %s does not support %s requests 🚦", endpoint,
            exc.getRequest().getMethod().toString());
  }

  public int getRouteErrStatus() {
    return isRouteNotFound ? 404 : 405;
  }
}