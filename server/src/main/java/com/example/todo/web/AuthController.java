package com.example.todo.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.service.UserService;
import com.example.todo.web.dto.AuthResponse;
import com.example.todo.web.dto.LoginRequest;
import com.example.todo.web.dto.RegisterRequest;
import com.example.todo.web.dto.UserResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5137", allowCredentials = "true")
public class AuthController {
    private final UserService userService; 

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {

        UserResponse res = userService.register(request);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // check credentials and generate JWT token
        AuthResponse res = userService.login(request);
        return ResponseEntity.ok(res);
    }
}
