package server.lib.kits;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import server.conf.env_conf.EnvKeeper;

@Service
@Getter
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class BaseKit {
    private final ObjectMapper jack;
    private final EnvKeeper envKeeper;
}
