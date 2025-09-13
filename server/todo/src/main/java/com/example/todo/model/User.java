package com.example.todo.model;

import jakarta.persistence.*;
import java.util.*;


@Entity @Table(name="users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String email; 

    @Column(nullable=false)
    private String passwordHash;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Week> weeks = new ArrayList<>();

    // getters, setters 
    public long getId() { return id; }
    public void setId(Long id) { this.id = id; };

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; };

    public String getPassword() { return passwordHash; }
    public void setPassword(String password) { this.passwordHash = password; };
}
