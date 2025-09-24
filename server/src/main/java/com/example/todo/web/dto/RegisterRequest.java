package com.example.todo.web.dto;

public class RegisterRequest {
    @email @NotBlank 
    private String email; 

    @NotBlank @Size(min = 3, max = 32)
    private String username; 

    @NotBlank @Size(min = 8, max = 128)
    private String password; 
}