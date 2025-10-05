package com.example.todo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
    private final byte[] key;
    private final long expirationMs;

    public JwtService(org.springframework.core.env.Environment env) {
        var secret = env.getProperty("security.jwt.secret", "dev-change-me");
        this.key = secret.getBytes(StandardCharsets.UTF_8);
        var minutes = Long.parseLong(env.getProperty("security.jwt.expiration-minutes", "120"));
        this.expirationMs = minutes * 60_000;
    }

    public String generate(String username, Long userId) {
        var now = Instant.now();
        return Jwts.builder()
                .subject(username)
                .claim("uid", userId)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMs)))
                .signWith(Keys.hmacShaKeyFor(key))
                .compact();
    }

    public String username(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
