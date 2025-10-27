package com.itvedant.bloodbankmanagement.dto; // Ensure this package matches your project structure

public class AuthRequest {
    private String username;
    private String password;

    // Default constructor is good practice for DTOs
    public AuthRequest() {
    }

    // Constructor with fields (optional, but convenient)
    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthRequest{" +
               "username='" + username + '\'' +
               ", password='[PROTECTED]'" +
               '}';
    }
}
