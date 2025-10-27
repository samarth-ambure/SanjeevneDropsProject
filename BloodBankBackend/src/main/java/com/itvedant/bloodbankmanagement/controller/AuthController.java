package com.itvedant.bloodbankmanagement.controller;

import com.itvedant.bloodbankmanagement.entity.User;
import com.itvedant.bloodbankmanagement.service.AuthService;
import com.itvedant.bloodbankmanagement.dto.AuthRequest; // Import the new DTO
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register endpoint - can still use User entity if you only need username/password
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    // Login endpoint (now uses AuthRequest DTO)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest loginRequest) { // Change User to AuthRequest
        String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }
}