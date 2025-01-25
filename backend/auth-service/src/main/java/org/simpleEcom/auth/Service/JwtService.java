package org.simpleEcom.auth.Service;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(String email , Set<String> roles) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
            .withSubject(email)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + expiration))
            .withClaim("roles", roles.stream().collect(Collectors.toList()))
            .sign(algorithm);
    }

    public String getEmailFromToken(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
            .build()
            .verify(token)
            .getSubject();
    }

    public Boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC256(secret))
                .build()
                .verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }
}
