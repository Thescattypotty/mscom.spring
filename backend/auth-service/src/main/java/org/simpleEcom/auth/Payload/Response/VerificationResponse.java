package org.simpleEcom.auth.Payload.Response;

import java.util.Set;

public record VerificationResponse(
    Boolean verified,
    Set<String> roles
) {
    
}
