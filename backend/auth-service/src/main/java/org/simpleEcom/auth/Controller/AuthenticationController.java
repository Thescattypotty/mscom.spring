package org.simpleEcom.auth.Controller;

import org.simpleEcom.auth.Payload.Request.LoginRequest;
import org.simpleEcom.auth.Payload.Request.RegisterRequest;
import org.simpleEcom.auth.Payload.Response.JwtResponse;
import org.simpleEcom.auth.Payload.Response.UserResponse;
import org.simpleEcom.auth.Service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        return new ResponseEntity<>(authenticationService.login(loginRequest), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterRequest registerRequest) {
        authenticationService.register(registerRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> me() {
        return new ResponseEntity<>(authenticationService.currentUser(), HttpStatus.OK);
    }
}
