package com.example.todo.web.dto;

import java.time.LocalDate;

public record TodoDTO (
    Long id, 
    Long todoListId,
    String title, 
    String description,
    boolean done, 
    Integer position, 
    LocalDate dueAt, 
    LocalDate createdAt,
    LocalDate updatedAt) 
    {}
