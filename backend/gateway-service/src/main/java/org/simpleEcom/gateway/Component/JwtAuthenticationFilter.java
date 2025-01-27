package org.simpleEcom.gateway.Component;

import org.simpleEcom.gateway.Payload.JwtAuthenticationToken;
import org.simpleEcom.gateway.Service.JwtAuthenticationManager;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RefreshScope
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter implements WebFilter{
    
    private final JwtAuthenticationManager authenticationManager;

    @NonNull
    @Override
    public Mono<Void> filter(@NonNull ServerWebExchange exchange,@NonNull WebFilterChain chain) {
        return Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("Authorization"))
            .filter(authHeader -> authHeader.startsWith("Bearer "))
            .map(authHeader -> authHeader.substring(7))
            .flatMap(token -> 
                authenticationManager.authenticate(new JwtAuthenticationToken(token))
                    .flatMap(authentication -> {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        authentication.setAuthenticated(true);
                        return chain.filter(exchange);
                    })
                    .onErrorResume(e -> {
                        log.error("Error: {}", e.getMessage());
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }
                )
            )
            .switchIfEmpty(chain.filter(exchange));
    }
}
