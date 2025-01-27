package org.simpleEcom.order.Security.Component;

import java.io.IOException;

import org.simpleEcom.order.Security.Payload.JwtAuthenticationToken;
import org.simpleEcom.order.Security.Service.JwtAuthenticationManager;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtAuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
        ) throws ServletException, IOException {
        
            try {
                String authHeader = request.getHeader("Authorization");
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    filterChain.doFilter(request, response);
                    return;
                }

                String token = authHeader.substring(7);
                UsernamePasswordAuthenticationToken authentication = authenticationManager
                        .authenticate(new JwtAuthenticationToken(token));

                if (authentication != null && authentication.isAuthenticated()) {
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));
                    authentication.setAuthenticated(true);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }

            filterChain.doFilter(request, response);
    }

}
