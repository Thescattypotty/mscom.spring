package org.simpleEcom.auth.IService;

import org.simpleEcom.auth.Payload.Request.LoginRequest;
import org.simpleEcom.auth.Payload.Request.RegisterRequest;
import org.simpleEcom.auth.Payload.Response.JwtResponse;

public interface IAuthenticationService {
    JwtResponse login(LoginRequest loginRequest);
    void register(RegisterRequest registerRequest);
    void logout();
}
