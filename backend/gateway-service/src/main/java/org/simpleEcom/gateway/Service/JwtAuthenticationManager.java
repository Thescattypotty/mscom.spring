package org.simpleEcom.gateway.Service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationManager implements ReactiveAuthenticationManager{

    private final JwtService jwtService;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        return Mono.just(authentication)
            .map(auth -> validateAndSetAuthentication(auth.getCredentials().toString()))
            .doOnSuccess(auth -> auth.setAuthenticated(true))
            .onErrorResume(e -> Mono.error(new BadCredentialsException("Invalid token")));
    }

    private Authentication validateAndSetAuthentication(String token){
        return new UsernamePasswordAuthenticationToken(
            jwtService.getSubject(token),
            null,
            jwtService.getClaims(token)
        );
    }
}
