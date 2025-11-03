package server.decorators;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import server.conf.db.remote_dictionary.RD;
import server.lib.dev.lib_log.LibLog;
import server.lib.kits.BaseKit;

@Service
@RequiredArgsConstructor
public final class LifeSpawn {
    private final BaseKit kit;
    private final RD rd;

    @SuppressWarnings({ "UnnecessaryTemporaryOnConversionFromString" })
    public void lifeCheck(WebServerInitializedEvent e) {
        rd.dbSize().doOnNext(size -> {

            LibLog.log(String.format("🚀 server running on => %d...", e.getWebServer().getPort()),
                    String.format("⬜ whitelist => %s", kit.getEnvKeeper().getFrontUrl()),
                    String.format("🧮 redis keys => %d", size));

        }).subscribe(res -> {
        }, err -> LibLog.logErr(err));

    }
}
