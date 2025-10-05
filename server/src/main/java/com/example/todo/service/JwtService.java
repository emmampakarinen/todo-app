package com.example.todo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtService {
    private final Environment env;
    private SecretKey signingKey;
    private long expirationMs;

    public JwtService(Environment env) {
        this.env = env;
    }

    @PostConstruct
    void init() {
        var secret = env.getProperty("security.jwt.secret");
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("Missing security.jwt.secret (set env var JWT_SECRET).");
        }

        byte[] bytes = secret.getBytes(StandardCharsets.UTF_8);
        if (bytes.length < 32) { 
            throw new IllegalStateException("JWT secret must be at least 32 bytes. Current length: " + bytes.length);
        }
        this.signingKey = Keys.hmacShaKeyFor(bytes);

        // expiration config
        var minutes = Long.parseLong(env.getProperty("security.jwt.expiration-minutes", "120"));
        this.expirationMs = minutes * 60_000L;
    }

    public String generate(String username, Long userId) {
        var now = Instant.now();
        return Jwts.builder()
                .subject(username)
                .claim("uid", userId)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMs)))
                .signWith(signingKey)
                .compact();
    }

    public String username(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
