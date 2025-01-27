package org.simpleEcom.order.Component;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;



@Component
public class AuditorAwareComponent implements AuditorAware<String>{
    private static final ThreadLocal<Boolean> AUDITOR_CALL_IN_PROGRESS = new ThreadLocal<>();

    @Override
    @NonNull
    public Optional<String> getCurrentAuditor() {
        if(Boolean.TRUE.equals(AUDITOR_CALL_IN_PROGRESS.get())) {
            return Optional.empty();
        }
        try {
            AUDITOR_CALL_IN_PROGRESS.set(true);
            return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getPrincipal)
                .map(Object::toString);
        } finally {
            AUDITOR_CALL_IN_PROGRESS.remove();
        }
    }


}
