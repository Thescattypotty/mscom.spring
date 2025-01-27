package org.simpleEcom.auth.Payload.Response;

import java.time.LocalDate;
import java.util.Set;

public record UserResponse(
    String id,
    String firstName,
    String lastName,
    String email,
    Set<String> roles,
    LocalDate birthday,
    String createdAt,
    String updatedAt
) {
    
}
