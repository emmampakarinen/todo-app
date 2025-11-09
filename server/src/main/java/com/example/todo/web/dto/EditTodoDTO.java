package com.example.todo.web.dto;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public record EditTodoDTO (
    @NotNull Long id, 
    String title, 
    String description,
    LocalDate dueAt
) {}
