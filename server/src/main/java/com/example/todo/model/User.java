package com.example.todo.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "uk_users_email", columnNames = "email"),
        @UniqueConstraint(name = "uk_users_username", columnNames = "username")
})
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String email; 

    @Column(nullable=false, unique=true)
    private String username; 

    @Column(nullable=false, name = "password_hash")
    private String passwordHash;

    @Column(nullable = false) 
    @Builder.Default 
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @OneToMany(
        mappedBy="user", 
        cascade = CascadeType.ALL, 
        orphanRemoval = true)
    @Builder.Default 
    private List<TodoList> todoLists = new ArrayList<>();

}
