package org.simpleEcom.user.Security.Service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationManager implements AuthenticationManager{
    
    private final JwtService jwtService;
    
    @Override
    public UsernamePasswordAuthenticationToken authenticate(Authentication authentication) {
        if(authentication != null){
            log.info("JwtAuthenticationManager: " + authentication.getCredentials().toString());
            authentication.setAuthenticated(true);
            return new UsernamePasswordAuthenticationToken(
                jwtService.getSubject(authentication.getCredentials().toString()),
                null,
                jwtService.getClaims(authentication.getCredentials().toString())
            );
        }
        return null;
    }
    
}
