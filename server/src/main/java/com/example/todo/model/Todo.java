package com.example.todo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@Entity @Table(name="todos")
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // a list can have many todos
    @ManyToOne(optional=false) @JoinColumn(name="list_id", nullable = false)
    private TodoList todoList;

    @Column(nullable=false)
    private String title;

    @Column(columnDefinition = "text")
    private String notes;

    @Column(nullable = false)
    private boolean done = false;

    @Column(nullable = false)
    private Integer position = 0;

    @Column(name = "due_at")
    private LocalDateTime dueAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // getters and setters implemented at compile time by lombok
}
