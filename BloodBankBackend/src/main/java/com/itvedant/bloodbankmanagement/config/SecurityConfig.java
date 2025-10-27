package com.itvedant.bloodbankmanagement.config;

import com.itvedant.bloodbankmanagement.security.JwtAuthFilter;
import com.itvedant.bloodbankmanagement.security.JwtUtil; // NEW IMPORT: Required to create JwtAuthFilter bean
import com.itvedant.bloodbankmanagement.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // NEW IMPORT
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    // No @Autowired fields for other beans defined *within* this class to prevent circular deps.
    // JwtUtil can be @Autowired if it's a @Component, or passed as a param if it's a @Bean.

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(CustomUserDetailsService customUserDetailsService) {
        // CustomUserDetailsService should be @Service and Spring will autowire it here.
        return customUserDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // Define DaoAuthenticationProvider as a bean
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    // Define JwtAuthFilter as a bean here. It now correctly receives its dependencies.
    @Bean
    public JwtAuthFilter jwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        return new JwtAuthFilter(jwtUtil, userDetailsService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter, DaoAuthenticationProvider authenticationProvider) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Allow OPTIONS requests for CORS preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // <-- THIS IS KEY FOR CORS PREFLIGHTS
                        .requestMatchers("/api/auth/**").permitAll() // Allow auth endpoints
                        .anyRequest().authenticated() // All other requests need authentication
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Add the JWT filter before Spring Security's default username/password filter
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Tell Spring Security to use your custom authentication provider
        http.authenticationProvider(authenticationProvider);

        return http.build();
    }
}