package com.example.todo.web.dto;

public record UpdateUserRequest (
    String email,
    String username
) {} 
