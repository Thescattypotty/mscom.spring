package org.simpleEcom.user.IService;

import org.simpleEcom.user.Payload.Request.LoginRequest;
import org.simpleEcom.user.Payload.Request.UserCreateRequest;
import org.simpleEcom.user.Payload.Request.UserRequest;
import org.simpleEcom.user.Payload.Response.UserResponse;
import org.simpleEcom.user.Payload.Response.VerificationResponse;
import org.springframework.data.domain.Page;

public interface IUserService {
    void createUser(UserCreateRequest userRequest);
    void updateUser(String id, UserRequest userRequest);
    void deleteUser(String id);
    UserResponse getUser(String id);
    Page<UserResponse> getUsers(int page , int size, String sortBy, String order);
    VerificationResponse verifyCredentials(LoginRequest loginRequest);
}
