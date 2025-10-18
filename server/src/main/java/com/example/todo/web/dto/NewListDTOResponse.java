package com.example.todo.web.dto;

import java.util.ArrayList;

import com.example.todo.model.Todo;

public record NewListDTOResponse (
    Long id,
    String name,
    String description
) {} 
