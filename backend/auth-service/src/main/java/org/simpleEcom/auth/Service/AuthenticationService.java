package org.simpleEcom.auth.Service;

import org.simpleEcom.auth.Client.UserClient;
import org.simpleEcom.auth.IService.IAuthenticationService;
import org.simpleEcom.auth.Payload.Request.LoginRequest;
import org.simpleEcom.auth.Payload.Request.RegisterRequest;
import org.simpleEcom.auth.Payload.Response.JwtResponse;
import org.simpleEcom.auth.Payload.Response.VerificationResponse;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService{
    
    private final UserClient userClient;
    private final JwtService jwtService;

    @Override
    public JwtResponse login(LoginRequest loginRequest) {
        VerificationResponse verification = userClient.verifyUserCredentials(loginRequest);
        System.out.println("Verification response: " + verification.verified());
        if(Boolean.TRUE.equals(verification.verified())) {
            return new JwtResponse(jwtService.generateToken(loginRequest.email(),verification.roles()));
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    @Override
    public void register(RegisterRequest registerRequest) {
        userClient.createUser(registerRequest);
    }

}
