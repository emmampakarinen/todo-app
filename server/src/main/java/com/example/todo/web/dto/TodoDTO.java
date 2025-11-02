package com.example.todo.web.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TodoDTO (
    Long id, 
    Long todoListId,
    String title, 
    String description,
    boolean done, 
    Integer position, 
    LocalDate dueAt, 
    LocalDateTime createdAt,
    LocalDateTime updatedAt) 
    {}
