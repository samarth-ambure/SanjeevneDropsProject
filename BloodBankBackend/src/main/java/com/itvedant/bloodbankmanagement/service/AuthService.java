package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.User;
import com.itvedant.bloodbankmanagement.repository.UserRepository;
import com.itvedant.bloodbankmanagement.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication; // Make sure this import is present
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager; // Autowire AuthenticationManager

    /**
     * Register new user
     */
    public User register(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Login user and return JWT token
     * This method now uses Spring Security's AuthenticationManager to handle
     * the authentication process, ensuring the security context is correctly populated
     * and proper authentication failures are handled.
     */
    public String login(String username, String Stringpassword) { // Changed 'password' to 'Stringpassword' to avoid conflict with local variable if any, otherwise can be 'password'
        // Use AuthenticationManager to authenticate the user
        // This will internally use CustomUserDetailsService to load user details
        // and PasswordEncoder to match the provided password with the stored hashed password.
        // If authentication fails (e.g., bad credentials), an AuthenticationException will be thrown.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, Stringpassword) // Use the provided username and password
        );

        // If authentication is successful, generate and return the JWT token for the authenticated user
        // The 'username' is now confirmed to be valid and authenticated by Spring Security
        return jwtUtil.generateToken(username);
    }
}