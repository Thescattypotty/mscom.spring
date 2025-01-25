package org.simpleEcom.auth.Payload.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
    @NotNull(message = "Email is required")
    @Email(message = "Email should be valid")
    String email,
    @NotNull(message = "Password is required")
    @NotBlank(message = "Password should not be empty")
    String password
) {
    
}
