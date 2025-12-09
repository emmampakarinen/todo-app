package com.example.todo.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.mappers.UserMapper;
import com.example.todo.model.User;
import com.example.todo.service.UserService;
import com.example.todo.web.dto.ApiResponse;
import com.example.todo.web.dto.AuthResponse;
import com.example.todo.web.dto.LoginRequest;
import com.example.todo.web.dto.RegisterRequest;
import com.example.todo.web.dto.UserDTO;

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
    public ResponseEntity<ApiResponse<UserDTO>> register(@Valid @RequestBody RegisterRequest request) {

        User user = userService.register(request);
        UserDTO userDto = UserMapper.toDto(user);

        return ResponseEntity.ok(new ApiResponse<>("User created. Please check your email to verify.", userDto, "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        // check credentials and generate JWT token
        AuthResponse authRes = userService.login(request);
        return ResponseEntity.ok(new ApiResponse<>("Login successful", authRes, "success"));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam("token") String token) {
        try {
            userService.verifyEmail(token);
            return ResponseEntity.ok(
                new ApiResponse<>("Email verified successfully", null, "success")
            );
        } catch (IllegalArgumentException e) {
            // invalid or already used
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(e.getMessage(), null, "error")
            );
        } catch (IllegalStateException e) {
            // expired token
            return ResponseEntity.status(410).body( // 410 Gone
                new ApiResponse<>(e.getMessage(), null, "error")
            );
        }
    }
}