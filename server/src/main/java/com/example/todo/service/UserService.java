package com.example.todo.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.todo.model.User;
import com.example.todo.repo.UserRepository;
import com.example.todo.web.dto.AuthResponse;
import com.example.todo.web.dto.LoginRequest;
import com.example.todo.web.dto.RegisterRequest;
import com.example.todo.web.dto.UserDTO;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository users; // database 
    private final PasswordEncoder passwordEncoder; // hashing passwords
    private final JwtService jwtService;  // generating JWT tokens
    private final EmailService emailService;
    private final String backendUrl;

    public UserService(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailService, @Value("${app.backend.url}") String backendUrl) {
        this.users = users; this.passwordEncoder = passwordEncoder; this.jwtService = jwtService; this.emailService = emailService; this.backendUrl = backendUrl;
    }
    
    public User getUser(Long userId) {
        return users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional
    public void verifyEmail(String token) {
        var user = users.findByVerificationToken(token)
            .orElseThrow(() ->
                new IllegalArgumentException("Invalid or already used token"));

        if (user.getVerificationTokenExpiresAt() != null &&
            user.getVerificationTokenExpiresAt().isBefore(Instant.now())) {
            throw new IllegalStateException("Verification link has expired");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiresAt(null);
        users.save(user);
    }

    @Transactional
    public User register(RegisterRequest request) {
        if (users.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (users.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }

        // creating new user
        User user = User.builder()
            .email(request.getEmail())
            .username(request.getUsername())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .build();
        user.setEmailVerified(false);

        // token for verifying the user e-mail
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiresAt(
                Instant.now().plus(1, ChronoUnit.DAYS)
        );

        var savedUser = users.save(user);

        String verifyUrl = backendUrl + "/api/auth/verify-email?token=" + token;

        String body = """
                Hi!

                Thanks for registering. Please confirm your email by clicking the link below:

                %s

                If you didn't create an account, you can ignore this email.
                """.formatted(verifyUrl);

        emailService.sendEmail(request.getEmail(), "Confirm your email", body);

        return savedUser;
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        // check credentials
        var user = users.findByUsername(request.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException("E-mail not verified");
        }

        // Generate JWT token
        var token = jwtService.generate(user.getUsername(), user.getId());

        var userRes = new UserDTO(user.getId(), user.getEmail(), user.isEmailVerified(), user.getUsername(), user.getProfileImageUrl(), user.getCreatedAt());
        return new AuthResponse(token, userRes);
    }

    @Transactional
    public User updateUserInfo(Long userId, String email, String username) {
        var user = users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // update email if provided and if not already taken and differs from current email
        if (email != null && !email.isEmpty()) {
            if (!email.equals(user.getEmail())) {
                if (users.existsByEmail(email)) {
                    throw new IllegalArgumentException("Email already in use");
                }
            }
            user.setEmail(email);
        }

        // same for username; update if provided and if not already taken and differs from current username
        if (username != null && !username.isEmpty()) {
            if (!username.equals(user.getUsername())) {
                if (users.existsByUsername(username)) {
                    throw new IllegalArgumentException("Username already in use");
                }
            user.setUsername(username);
            }
        }

        return users.save(user);
    }

    @Transactional
    public User addUserImage(Long userId, String imageUrl) {
        // get user
        var user = users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setProfileImageUrl(imageUrl);
        return users.save(user);
    }

    @Transactional
    public User deleteUserImage(Long userId) {
        // get user
        var user = users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setProfileImageUrl(null);
        return users.save(user);
    }

    @Transactional
    public void changePassword(String oldPassword, String newPassword, Long userId) {
        // check credentials
        var user = users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // verify old password
        if (!passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Old password does not match");
        }

        // update password
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        users.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        // get user
        var user = users.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

        users.delete(user);
    }
}
