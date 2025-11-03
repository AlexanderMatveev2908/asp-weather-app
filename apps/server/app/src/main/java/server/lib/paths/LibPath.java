package server.lib.paths;

import java.nio.file.Files;
import java.nio.file.Path;

import server.decorators.flow.ErrAPI;
import server.lib.paths.sub.LibPathServerDir;

public final class LibPath {

    public static final Path SERVER_DIR = LibPathServerDir.grabDir();
    public static final Path ASSETS_DIR;
    public static final Path IMAGES_DIR;
    public static final Path VIDEOS_DIR;
    public static final Path LOG_DIR;
    public static final Path LOG_FILE;
    public static final Path LOG_FILE_ERR;

    static {
        ASSETS_DIR = SERVER_DIR.resolve("assets").normalize();
        IMAGES_DIR = ASSETS_DIR.resolve("images").normalize();
        VIDEOS_DIR = ASSETS_DIR.resolve("videos").normalize();
        LOG_DIR = SERVER_DIR.resolve("logger").normalize();
        LOG_FILE = LOG_DIR.resolve("log.json");
        LOG_FILE_ERR = LOG_DIR.resolve("log_err.json");

        ensureDirs();
    }

    public LibPath() {
        throw new ErrAPI("do not instantiate");
    }

    private static void ensureDirs() {
        try {
            Files.createDirectories(IMAGES_DIR);
            Files.createDirectories(VIDEOS_DIR);
            Files.createDirectories(LOG_DIR);

            if (!Files.exists(LOG_FILE))
                Files.createFile(LOG_FILE);
            if (!Files.exists(LOG_FILE_ERR))
                Files.createFile(LOG_FILE_ERR);

        } catch (Exception err) {
            throw new ErrAPI("err creating required dir/files");
        }
    }

}
