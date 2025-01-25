package org.simpleEcom.gateway.Service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    
    public String getSubject(String token) {
        return "subject";
    }
    public Set<GrantedAuthority> getClaims(String token) {
        return new HashSet<>();
    }

    public boolean isTokenExpired(String token) {
        return false;
    }

    public boolean isTokenValid(String token) {
        return true;
    }
}
