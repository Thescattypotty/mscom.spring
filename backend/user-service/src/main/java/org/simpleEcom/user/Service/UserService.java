package org.simpleEcom.user.Service;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.simpleEcom.user.Entity.User;
import org.simpleEcom.user.EntityRepository.UserRepository;
import org.simpleEcom.user.Exception.UserNotFoundException;
import org.simpleEcom.user.IService.IUserService;
import org.simpleEcom.user.Payload.Mapper.UserMapper;
import org.simpleEcom.user.Payload.Request.LoginRequest;
import org.simpleEcom.user.Payload.Request.UserCreateRequest;
import org.simpleEcom.user.Payload.Request.UserRequest;
import org.simpleEcom.user.Payload.Response.UserResponse;
import org.simpleEcom.user.Payload.Response.VerificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void createUser(UserCreateRequest userRequest) {
        User user = userMapper.toUser(userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        userRepository.save(user);
    }
    
    @Override
    @Transactional
    public void updateUser(String id, UserRequest userRequest) {
        User user = userRepository.findById(UUID.fromString(id))
            .orElseThrow(() -> new UserNotFoundException());
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        user.setEmail(userRequest.email());
        user.setRoles(userRequest.roles());
        user.setBirthday(userRequest.birthday());
        userRepository.save(user);
    }
    
    @Override
    @Transactional
    public void deleteUser(String id) {
        if(userRepository.existsById(UUID.fromString(id))){
            userRepository.deleteById(UUID.fromString(id));
        }else{
            throw new UserNotFoundException();
        }
    }

    @Override
    public UserResponse getUser(String id) {
        return userRepository.findById(UUID.fromString(id))
            .map(userMapper::fromUser)
            .orElseThrow(() -> new UserNotFoundException());
    }

    @Override
    public Page<UserResponse> getUsers(int page, int size, String sortBy, String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order), sortBy));
        return userRepository.findAll(pageable)
            .map(userMapper::fromUser);
    }

    @Override
    public VerificationResponse verifyCredentials(LoginRequest loginRequest){
        User user = null;
        try {
            user = userRepository.findByEmail(loginRequest.email()).get();
        } catch (NoSuchElementException e) {
            return new VerificationResponse(false, new HashSet<>());
        }

        return new VerificationResponse(
            passwordEncoder.matches(loginRequest.password(), user.getPassword()),
            user.getRoles()
        );
    }
}