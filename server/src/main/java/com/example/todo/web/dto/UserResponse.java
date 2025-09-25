package com.example.todo.web.dto;

import java.time.OffsetDateTime;

public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private OffsetDateTime createdAt;

    public UserResponse(Long id, String email, String username, OffsetDateTime createdAt) {
        this.id = id; this.email = email; this.username = username; this.createdAt = createdAt;
    }
}