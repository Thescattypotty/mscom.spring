package org.simpleEcom.user.Controller;

import org.simpleEcom.user.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.simpleEcom.user.Payload.Request.LoginRequest;
import org.simpleEcom.user.Payload.Request.UserCreateRequest;
import org.simpleEcom.user.Payload.Request.UserRequest;
import org.simpleEcom.user.Payload.Response.UserResponse;
import org.simpleEcom.user.Payload.Response.VerificationResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody UserCreateRequest userRequest) {
        userService.createUser(userRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable String id, @RequestBody UserRequest userRequest) {
        userService.updateUser(id, userRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable String id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "15") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "asc") String order
    ) {
        return new ResponseEntity<>(userService.getUsers(page, size, sortBy, order), HttpStatus.OK);
    }

    @PostMapping("/verify-credentials")
    public ResponseEntity<VerificationResponse> verifyCredentials(@RequestBody LoginRequest loginRequest){
        return new ResponseEntity<>(userService.verifyCredentials(loginRequest),HttpStatus.OK);
    }
}
