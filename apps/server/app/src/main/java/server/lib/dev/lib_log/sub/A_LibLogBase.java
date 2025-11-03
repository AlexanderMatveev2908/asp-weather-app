package server.lib.dev.lib_log.sub;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import server.lib.dev.lib_log.LibLog;

public class A_LibLogBase {
    private static final String APP_PKG = "server";

    private record RecMainLog(String time, String fileName, String thread) {
    }

    private static RecMainLog getMainLogInfo() {
        String time = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));

        StackTraceElement caller = Arrays.stream(Thread.currentThread().getStackTrace())
                .filter(f -> f.getClassName().startsWith(APP_PKG))
                .filter(f -> !f.getClassName().contains(LibLog.class.getSimpleName())).findFirst().orElse(null);

        String fileName = (caller != null) ? caller.getFileName() : "unknown caller";
        String thread = Thread.currentThread().getName();

        return new RecMainLog(time, fileName, thread);
    }

    public static void limiter() {
        System.out.println("-".repeat(60));
    }

    public static void startLog() {
        System.out.println("\n");
        limiter();
    }

    public static void endLog() {
        limiter();
        System.out.println("\n");
    }

    public static void logHeader(String title) {
        RecMainLog mainInfo = getMainLogInfo();

        System.out.printf("⏰ %s • 🗃️ %s • %s%n", mainInfo.time(), mainInfo.fileName(),
                title != null ? "📌 " + title : "🧵 " + mainInfo.thread());
    }

    public static void logTtl(String title, Object... arg) {

        startLog();
        logHeader(title);

        System.out.println("\t");

        if (arg != null)
            for (Object v : arg)
                System.out.println(v);

        endLog();
    }

    public static void log(Object... arg) {
        logTtl(null, arg);
    }

}
