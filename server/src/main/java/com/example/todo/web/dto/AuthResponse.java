package com.example.todo.web.dto;
import lombok.Value;

@Value
public class AuthResponse {
    private UserDTO user; 
    private String token;

    public AuthResponse(String token, UserDTO user) {
        this.token = token; this.user = user; 
    }
}


