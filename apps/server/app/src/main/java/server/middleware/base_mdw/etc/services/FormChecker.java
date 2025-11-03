package server.middleware.base_mdw.etc.services;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;

@Service
@RequiredArgsConstructor
public final class FormChecker {
    private final Validator checker;

    public <T> Mono<Void> check(Api api, T form) {
        Set<ConstraintViolation<T>> errs = checker.validate(form);

        if (errs.isEmpty())
            return Mono.fromRunnable(() -> api.setMappedDataAttr(form));

        List<Map<String, String>> errors = errs.stream()
                .map(err -> Map.of("field", err.getPropertyPath().toString(), "msg", err.getMessage())).toList();

        return Mono.error(new ErrAPI(errors.get(0).get("msg"), 422, Map.of("errs", errors)));
    }

}
