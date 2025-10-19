package com.example.todo.web.dto;

import java.util.List;

public record TodoListDTO (Long id,
    String name,
    String description,
    List<TodoDTO> todos) 
    {}
