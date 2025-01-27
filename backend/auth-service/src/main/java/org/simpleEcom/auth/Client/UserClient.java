package org.simpleEcom.auth.Client;

import org.simpleEcom.auth.Configuration.FeignClientConfiguration;
import org.simpleEcom.auth.Payload.Request.LoginRequest;
import org.simpleEcom.auth.Payload.Request.RegisterRequest;
import org.simpleEcom.auth.Payload.Response.UserResponse;
import org.simpleEcom.auth.Payload.Response.VerificationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "user-service",
    configuration = FeignClientConfiguration.class
)
public interface UserClient {
    @PostMapping("/api/v1/users/verify-credentials")
    VerificationResponse verifyUserCredentials(@RequestBody LoginRequest loginRequest);

    @PostMapping("/api/v1/users")
    Void createUser(@RequestBody RegisterRequest registerRequest);

    @GetMapping("/api/v1/users/email")
    UserResponse getUserByEmail(
        @RequestParam(required = true) String email
    );
}
