package com.example.todo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.todo.model.User;
import com.example.todo.repo.UserRepository;
import com.example.todo.web.dto.AuthResponse;
import com.example.todo.web.dto.LoginRequest;
import com.example.todo.web.dto.RegisterRequest;
import com.example.todo.web.dto.UserResponse;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository users; // database 
    private final PasswordEncoder passwordEncoder; // hashing passwords
    private final JwtService jwtService;  // generating JWT tokens

    public UserService(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.users = users; this.passwordEncoder = passwordEncoder; this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (users.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (users.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }

        User user = User.builder()
            .email(request.getEmail())
            .username(request.getUsername())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .build();

        var savedUser = users.save(user);
        return new UserResponse(
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getUsername(),
            savedUser.getCreatedAt()
        );
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        // check credentials
        var user = users.findByUsername(request.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        // Generate JWT token
        var token = jwtService.generate(user.getUsername(), user.getId());

        var userRes = new UserResponse(user.getId(), user.getEmail(), user.getUsername(), user.getCreatedAt());
        return new AuthResponse(token, userRes);
        }
}
