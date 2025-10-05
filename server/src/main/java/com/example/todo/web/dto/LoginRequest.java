package com.example.todo.web.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    @NotBlank @Size(min = 3, max = 32)
    private String username; 

    @NotBlank @Size(min = 8, max = 128)
    private String password; 
}