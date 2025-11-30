package com.example.todo.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.todo.mappers.UserMapper;
import com.example.todo.model.User;
import com.example.todo.service.JwtService;
import com.example.todo.service.ProfileImageService;
import com.example.todo.service.UserService;
import com.example.todo.web.dto.ApiResponse;
import com.example.todo.web.dto.UpdateUserRequest;
import com.example.todo.web.dto.UserDTO;

@RestController @RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    private final ProfileImageService profileImageService;

    public UserController(UserService service, JwtService jwtService, ProfileImageService profileImageService) {
        this.userService = service;
        this.jwtService = jwtService;
        this.profileImageService = profileImageService;
    }

    @PatchMapping("/update-user")
    public User updateUserInfo(@RequestBody UpdateUserRequest body,
        @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        return userService.updateUserInfo(currentUserId, body.email(), body.username());
    }

    @PatchMapping("")
    public ResponseEntity<ApiResponse<Void>> addUserImage(String profileImageUrl,
        @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        userService.addUserImage(currentUserId, profileImageUrl);
        return ResponseEntity.ok(new ApiResponse<>("Profile image added successfully", "success"));
    }

    @PostMapping("/add-profile-image")
    public ResponseEntity<ApiResponse<UserDTO>> uploadProfileImage(@RequestParam("file") MultipartFile file,
        @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        String imageUrl = profileImageService.uploadProfileImage(currentUserId, file);
        User user = userService.addUserImage(currentUserId, imageUrl);

        UserDTO userDto = UserMapper.toDto(user);
        return ResponseEntity.ok(new ApiResponse<>("Image uploaded successfully", userDto, "success"));
    }

    @DeleteMapping("/delete-profile-image")
    public ResponseEntity<ApiResponse<UserDTO>> deleteProfileImage(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        User user = userService.getUser(currentUserId);

        profileImageService.deleteProfileImage(currentUserId, user.getProfileImageUrl());

        user = userService.deleteUserImage(currentUserId);
        UserDTO userDto = UserMapper.toDto(user);

        return ResponseEntity.ok(new ApiResponse<>("Image deleted successfully", userDto, "success"));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> updateUserInfo(String oldPassword, String newPassword,
        @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        userService.updateUserInfo(currentUserId, oldPassword, newPassword);
        return ResponseEntity.ok(new ApiResponse<>("Password updated successfully", "success"));

    }


    @DeleteMapping("/delete-user")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        userService.deleteUser(currentUserId);
        return ResponseEntity.ok(new ApiResponse<>("User deleted successfully", "success"));
    }
}
