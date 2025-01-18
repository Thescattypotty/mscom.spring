package org.simpleEcom.user.Payload.Request;

import java.time.LocalDate;
import java.util.Set;

import org.simpleEcom.user.Enum.ERole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserCreateRequest(
    String firstName,

    String lastName,
    
    @NotNull(message = "Email is required")
    @Email(message = "Email is invalid")
    
    String email,
    
    @NotNull(message = "Password is required")
    @NotBlank(message = "Password is required")
    String password,
    
    Set<ERole> roles,
    
    LocalDate birthday
) {
    
}
