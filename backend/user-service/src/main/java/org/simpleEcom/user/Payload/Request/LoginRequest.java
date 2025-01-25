package org.simpleEcom.user.Payload.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
    @Email(message = "Email should be valid")
    @NotNull(message = "Email should not be null")
    String email,
    @NotNull(message = "Password should not be null")
    @NotBlank(message = "Password should not be blank")
    String password
) {
    
}
