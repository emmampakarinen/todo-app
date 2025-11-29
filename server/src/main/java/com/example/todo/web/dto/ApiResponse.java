package com.example.todo.web.dto;

import lombok.Getter;
import lombok.Setter;

// Generic API response wrapper
@Getter @Setter
public class ApiResponse<T> {
    private String message;
    private T data;

    public ApiResponse() {} 

    public ApiResponse(String message) { // for responses without data
        this.message = message;
    }

    public ApiResponse(String message, T data) { // for responses with data
        this.message = message;
        this.data = data;
    }
}
