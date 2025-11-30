package com.example.todo.web.dto;

import lombok.Getter;
import lombok.Setter;

// Generic API response wrapper
@Getter @Setter
public class ApiResponse<T> {
    private String message;
    private T data;
    private String status; // "success" or "error"

    public ApiResponse() {} 

    public ApiResponse(String message, String status) { // for responses without data
        this.message = message;
        this.status = status;
    }

    public ApiResponse(String message, T data, String Status) { // for responses with data
        this.message = message;
        this.data = data;
        this.status = status;
    }
}
