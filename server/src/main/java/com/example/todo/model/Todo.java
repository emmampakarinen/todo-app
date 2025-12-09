package com.example.todo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
@Entity @Table(name="todos")
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // a list can have many todos
    @JsonIgnore // avoid circular reference in JSON serialization
    @ManyToOne(optional=false) @JoinColumn(name="list_id", nullable = false)
    private TodoList todoList;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    // expose the todoListId in the JSON representation
    @JsonProperty("todoListId")
    public Long getTodoListId() { return todoList != null ? todoList.getId() : null; }

    @Column(nullable=false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private boolean done = false;

    @Column(nullable = false)
    private boolean reminderSent;

    @Column(nullable = false)
    private Integer position = 0;

    @Column(name = "due_at")
    private LocalDate dueAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDate createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    // getters and setters implemented at compile time by lombok
}
