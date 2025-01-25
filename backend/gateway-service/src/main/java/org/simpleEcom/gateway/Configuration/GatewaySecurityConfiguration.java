package org.simpleEcom.gateway.Configuration;

import java.util.List;

import org.simpleEcom.gateway.Component.JwtAuthenticationFilter;
import org.simpleEcom.gateway.Component.JwtLogoutHandler;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity.AnonymousSpec;
import org.springframework.security.config.web.server.ServerHttpSecurity.CsrfSpec;
import org.springframework.security.config.web.server.ServerHttpSecurity.FormLoginSpec;
import org.springframework.security.config.web.server.ServerHttpSecurity.HttpBasicSpec;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@Configuration
@RequiredArgsConstructor
public class GatewaySecurityConfiguration {
    
    private static final List<String> TRUSTED_SERVICES = List.of(
        "auth-service",
        "user-service",
        "product-service",
        "order-service"
    );

    private static final List<String> OPEN_ENDPOINTS = List.of(
        "/api/v1/auth/register",
        "/api/v1/auth/login",
        "/api/v1/products/**",
        "/api/v1/orders",
        "/actuator/**",
        "/swagger-ui/**"
    );

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtLogoutHandler jwtLogoutHandler;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http
            .csrf(CsrfSpec::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .httpBasic(HttpBasicSpec::disable)
            .formLogin(FormLoginSpec::disable)
            .anonymous(AnonymousSpec::disable)
            .authorizeExchange(exchanges -> exchanges
                .pathMatchers(OPEN_ENDPOINTS.toArray(new String[0])).permitAll()
                .anyExchange().access((authentication, context) -> {
                    ServerHttpRequest request = context.getExchange().getRequest();
                    if(isInternalRequest(request)){
                        return Mono.just(new AuthorizationDecision(true));
                    }
                    return authentication.map(auth -> new AuthorizationDecision(auth.isAuthenticated()));
                })
            )
            .addFilterBefore(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
            .logout(logout -> 
                logout.logoutUrl("/api/v1/auth/logout")
                    .logoutHandler(jwtLogoutHandler)
                    .logoutSuccessHandler((exchange, authentication) -> {
                        exchange.getExchange().getResponse().setStatusCode(HttpStatus.OK);
                        return exchange.getExchange().getResponse().setComplete();
                    })
            )
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint((exchange, e) -> {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                })
            )
            .build();
    }

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route(
                "auth-service",
                r -> r.path("/api/v1/auth/**")
                    .uri("lb://auth-service")
            )
            .route("user-service",
                r -> r.path("/api/v1/users/**")
                    .uri("lb://user-service")
            )
            .route("product-service",
                r -> r.path("/api/v1/products/**")
                    .uri("lb://product-service")
            )
            .route("order-service",
                r -> r.path("/api/v1/orders/**")
                    .uri("lb://order-service")
            )
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Service-Name"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    // for this is better to use some advanced options like mTLS & Secret Key but for now its just for school purposes
    private boolean isInternalRequest(ServerHttpRequest request) {
        String serviceHeader = request.getHeaders().getFirst("X-Service-Name");
        return serviceHeader != null && TRUSTED_SERVICES.contains(serviceHeader);
    }
}
