package server.lib.dev.lib_log.sub;

public class C_LibLogErr extends B_LibLogAio {
  public static void logErr(Throwable err) {
    wErr(err);

    startLog();

    if (err == null) {
      logTtl("⚠️ passed null to logErr ⚠️");
      return;
    }

    logHeader(null);

    System.out.println("\t");

    StackTraceElement[] frames = err.getStackTrace();

    for (StackTraceElement f : frames)
      System.out.printf("📂 %s => 🔢 %d | 🆎 %s | ☢️ %s%n", f.getFileName(), f.getLineNumber(), f.getMethodName(),
          f.toString());

    String msg = err.getMessage();
    int depth = frames.length;
    StackTraceElement last = depth > 0 ? frames[0] : null;

    System.out.println("\t");
    System.out.printf("📝 msg => %s%n", msg);
    System.out.printf("📏 depth => %d%n", depth);

    if (last != null) {
      System.out.printf("💥 last file => 📁 %s%n", last.getFileName());
      System.out.printf("📏 last line => %d%n", last.getLineNumber());
      System.out.printf("👻 last cb name => %s%n", last.getMethodName());
    }

    endLog();

  }
}
