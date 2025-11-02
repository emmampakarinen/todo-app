package com.example.todo.web.dto;

import java.time.LocalDate;

public record NewTodoDTO(
    Long todoListId, 
    String title, 
    String description, 
    LocalDate dueAt) 
{}
