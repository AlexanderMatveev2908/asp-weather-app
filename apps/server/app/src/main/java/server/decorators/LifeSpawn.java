package server.decorators;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.conf.db.remote_dictionary.RD;
import server.conf.env_conf.EnvVars;
import server.lib.dev.lib_log.LibLog;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class LifeSpawn {
    private final EnvVars envKeeper;
    private final RD rd;

    @SuppressWarnings({ "UnnecessaryTemporaryOnConversionFromString" })
    public void lifeCheck(WebServerInitializedEvent e) {
        rd.dbSize().doOnNext(size -> {

            LibLog.log(String.format("🚀 server running on => %d...", e.getWebServer().getPort()),
                    String.format("⬜ whitelist => %s", envKeeper.getFrontUrl()),
                    String.format("🧮 redis keys => %d", size));

        }).subscribe(res -> {
        }, err -> LibLog.logErr(err));

    }
}
