package org.simpleEcom.user.Payload.Mapper;

import java.time.format.DateTimeFormatter;

import org.simpleEcom.user.Entity.User;
import org.simpleEcom.user.Payload.Request.UserCreateRequest;
import org.simpleEcom.user.Payload.Response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    /*
    public User toUser(UserRequest userRequest){
        return User.builder()
            .firstName(userRequest.firstName())
            .lastName(userRequest.lastName())
            .email(userRequest.email())
            .roles(userRequest.roles())
            .birthday(userRequest.birthday())
            .build();
    }
    */

    public User toUser(UserCreateRequest userCreateRequest){
        return User.builder()
            .firstName(userCreateRequest.firstName())
            .lastName(userCreateRequest.lastName())
            .email(userCreateRequest.email())
            .password(userCreateRequest.password())
            .roles(userCreateRequest.roles())
            .birthday(userCreateRequest.birthday())
            .build();
    }
    
    public UserResponse fromUser(User user){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        return new UserResponse(
            user.getId().toString(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRoles(),
            user.getBirthday(),
            user.getCreatedAt().format(formatter),
            user.getUpdatedAt().format(formatter)
        );
    }
}
