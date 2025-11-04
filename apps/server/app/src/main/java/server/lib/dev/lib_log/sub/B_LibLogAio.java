package server.lib.dev.lib_log.sub;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalTime;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import server.lib.data_structure.prs.LibPrs;
import server.lib.paths.LibPath;

public class B_LibLogAio extends A_LibLogBase {
  private static final ExecutorService logThread = Executors.newSingleThreadExecutor();

  protected static void asyncLog(Path p, Object arg) {
    logThread.submit(() -> {
      try (BufferedWriter bw = Files.newBufferedWriter(p, StandardCharsets.UTF_8, StandardOpenOption.CREATE,
          StandardOpenOption.TRUNCATE_EXISTING)) {

        String json;
        if (arg instanceof Throwable err)
          json = LibPrs.jsonFromObj(Map.of("msg", err.getMessage(), "type", err.getClass().getSimpleName(), "time",
              LocalTime.now().toString()));
        else
          json = LibPrs.jsonFromObj(arg);

        bw.write(json);
        bw.newLine();
      } catch (IOException err) {
        System.out.println("❌ failed log");
      }
    });
  }

  public static void wOk(Object arg) {
    asyncLog(LibPath.LOG_FILE, arg);
  }

  public static void wErr(Object arg) {
    asyncLog(LibPath.LOG_FILE_ERR, arg);
  }

}
