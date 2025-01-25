package org.simpleEcom.user.Configuration;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.IntStream;

import org.simpleEcom.user.Enum.ERole;
import org.simpleEcom.user.Payload.Request.UserCreateRequest;
import org.simpleEcom.user.Service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner{
    
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        IntStream.rangeClosed(1, 20).forEach(i -> {
            userService.createUser(
                new UserCreateRequest(
                    "firstName" + i,
                    "lastName" + i,
                    "email" + i + "@gmail.com",
                    "password",
                    Set.of(ERole.ROLE_ADMIN, ERole.ROLE_USER, ERole.ROLE_SELLER),
                    LocalDate.now().minusYears(20).minusDays(i)
                )
            );
        });
    }
}
