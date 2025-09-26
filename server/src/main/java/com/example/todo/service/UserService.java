package com.example.todo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.todo.model.User;
import com.example.todo.repo.UserRepository;
import com.example.todo.web.dto.RegisterRequest;
import com.example.todo.web.dto.UserResponse;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository users; // database 
    private final PasswordEncoder passwordEncoder; // hashing passwords

    public UserService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users; this.passwordEncoder = passwordEncoder;
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
}
