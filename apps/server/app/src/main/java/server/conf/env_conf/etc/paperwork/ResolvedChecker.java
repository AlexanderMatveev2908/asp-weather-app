package server.conf.env_conf.etc.paperwork;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class ResolvedChecker implements ConstraintValidator<Resolved, String> {
    @Override
    public boolean isValid(String val, ConstraintValidatorContext ctx) {
        return val != null && !val.isBlank() && !val.startsWith("${");
    }
}
