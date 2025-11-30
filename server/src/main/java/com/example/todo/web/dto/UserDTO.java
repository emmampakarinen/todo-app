package com.example.todo.web.dto;

import java.time.OffsetDateTime;

public record UserDTO(
  Long id,
  String email,
  String username,
  String profileImageUrl,
  OffsetDateTime createdAt
) {}
