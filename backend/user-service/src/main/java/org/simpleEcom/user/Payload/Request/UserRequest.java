package org.simpleEcom.user.Payload.Request;

import java.time.LocalDate;
import java.util.Set;

import org.simpleEcom.user.Enum.ERole;

import jakarta.validation.constraints.NotNull;

public record UserRequest(
    String firstName,
    
    String lastName,

    @NotNull(message = "Email is required")
    String email,
    
    Set<ERole> roles,
    
    LocalDate birthday
) {
    
}
