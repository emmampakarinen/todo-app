package com.example.todo.web.dto;
import lombok.Value;

@Value
public class AuthResponse {
    private UserResponse user; 
    private String token;

    public AuthResponse(String token, UserResponse user) {
        this.token = token; this.user = user; 
    }
}


