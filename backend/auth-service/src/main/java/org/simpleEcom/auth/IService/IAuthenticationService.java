package org.simpleEcom.auth.IService;

import org.simpleEcom.auth.Payload.Request.LoginRequest;
import org.simpleEcom.auth.Payload.Request.RegisterRequest;
import org.simpleEcom.auth.Payload.Response.JwtResponse;
import org.simpleEcom.auth.Payload.Response.UserResponse;

public interface IAuthenticationService {
    JwtResponse login(LoginRequest loginRequest);
    void register(RegisterRequest registerRequest);
    UserResponse currentUser();
}
