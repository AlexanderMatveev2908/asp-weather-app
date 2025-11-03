package server.lib.paths.sub;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import server.decorators.flow.ErrAPI;

public final class LibPathServerDir {

    // ? dev case => normal build with classes bytecode
    private static Path serverDirDev(Path appDir) {
        int levelsUp = 5;
        String up = (".." + File.separator).repeat(levelsUp);
        Path serverDir = appDir.resolve(up).normalize();

        return serverDir;
    }

    // ? jar case => spring boot JarLauncher create custom classLoader which no
    // ? more points to oroginal JAR path but to a in-memory structure returning /
    private static Path serverDirJar() {
        Path appDir = Paths.get(System.getProperty("user.dir"));
        Path serverDir;

        if (!appDir.endsWith("server"))
            serverDir = appDir.resolve("apps/server").normalize();
        else
            serverDir = appDir;

        return serverDir;
    }

    public static Path grabDir() {
        try {
            Path appDir = Paths.get(
                    LibPathServerDir.class.getProtectionDomain()
                            .getCodeSource()
                            .getLocation()
                            .toURI());

            if (appDir.toString().endsWith("classes/java/main")) {
                return serverDirDev(appDir);
            } else if (appDir.toString().equals("/")) {
                return serverDirJar();
            } else {
                throw new ErrAPI("not sure where I am 👻");
            }
        } catch (Exception err) {
            throw new ErrAPI("err extracting server dir");
        }

    }
}
