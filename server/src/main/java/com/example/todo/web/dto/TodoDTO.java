package com.example.todo.web.dto;

import java.time.LocalDateTime;

public record TodoDTO (
    Long id, 
    String title, 
    boolean done, 
    Integer position, 
    LocalDateTime dueDate) 
    {}
