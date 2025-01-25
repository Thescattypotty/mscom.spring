package org.simpleEcom.auth.Payload.Request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
    String firstName,

    String lastName,
    
    @NotNull(message = "Email is required")
    @Email(message = "Email is invalid")
    String email,
    
    @NotNull(message = "Password is required")
    @NotBlank(message = "Password is required")
    String password,
    
    Set<String> roles,
    
    LocalDate birthday
) {
    
}
