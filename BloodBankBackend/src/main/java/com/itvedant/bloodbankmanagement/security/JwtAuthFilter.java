package com.itvedant.bloodbankmanagement.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired; // Keep this if used in JwtUtil etc.
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
// REMOVE @Component HERE, we will define it as a @Bean in SecurityConfig
// import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// REMOVE @Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil; // Make final and inject via constructor
    private final UserDetailsService userDetailsService; // Make final and inject via constructor

    // NEW: Constructor injection for dependencies
    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    // List of paths that this filter should NOT apply to
    private static final String[] AUTH_WHITELIST = {
            "/api/auth/login",
            "/api/auth/register"
            // Add other public paths here if needed (e.g., /swagger-ui/**, /v3/api-docs/**)
    };

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        for (String publicPath : AUTH_WHITELIST) {
            if (path.startsWith(publicPath)) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                System.err.println("JWT processing error: " + e.getMessage());
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.err.println("Token validation failed for user: " + username);
            }
        }

        filterChain.doFilter(request, response);
    }
}