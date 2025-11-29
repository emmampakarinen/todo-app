package com.example.todo.web;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.model.User;
import com.example.todo.service.JwtService;
import com.example.todo.service.UserService;
import com.example.todo.web.dto.UpdateUserRequest;

@RestController @RequestMapping("/api")
public class UserController {
    private final UserService service;
    private final JwtService jwtService;

    public UserController(UserService service, JwtService jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }

    @PatchMapping("/update-user")
    public User updateUserInfo(@RequestBody UpdateUserRequest body,
        @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        return service.updateUserInfo(currentUserId, body.email(), body.username());
    }
}
