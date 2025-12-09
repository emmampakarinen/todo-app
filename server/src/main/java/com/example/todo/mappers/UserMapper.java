package com.example.todo.mappers;

import com.example.todo.model.User;
import com.example.todo.web.dto.UserDTO;

public class UserMapper {
    public static UserDTO toDto(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.isEmailVerified(),
            user.getUsername(),
            user.getProfileImageUrl(),
            user.getCreatedAt()
        );
    }
}

