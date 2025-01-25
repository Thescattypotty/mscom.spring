package org.simpleEcom.user.Payload.Response;

import java.util.Set;

import org.simpleEcom.user.Enum.ERole;

public record VerificationResponse(
    Boolean verified,
    Set<ERole> roles
) {
    
}

