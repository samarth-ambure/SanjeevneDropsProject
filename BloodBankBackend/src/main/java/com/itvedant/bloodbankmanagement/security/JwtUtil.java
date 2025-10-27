package com.itvedant.bloodbankmanagement.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails; // NEW IMPORT
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function; // NEW IMPORT

@Component
public class JwtUtil {

    private final String SECRET_KEY = "mysupersecretkeymysupersecretkey"; // 32+ chars - Keep this secure!
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // MODIFIED: validateToken now accepts UserDetails
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        // Token is valid if:
        // 1. The username in the token matches the UserDetails' username.
        // 2. The token is not expired.
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}