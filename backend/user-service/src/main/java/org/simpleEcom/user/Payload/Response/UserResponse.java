package org.simpleEcom.user.Payload.Response;

import java.time.LocalDate;
import java.util.Set;

import org.simpleEcom.user.Enum.ERole;

public record UserResponse(
    String id,
    String firstName,
    String lastName,
    String email,
    Set<ERole> roles,
    LocalDate birthday,
    String createdAt,
    String updatedAt
) {
    
}
