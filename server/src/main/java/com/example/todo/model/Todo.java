package com.example.todo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity @Table(name="todos")
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // a week can have many todos
    @ManyToOne(optional=false) @JoinColumn(name="week_id")
    private Week week;

    @Column(nullable=false)
    private String title;

    private String notes;
    private boolean done = false;
    private Integer position = 0;
    private LocalDateTime dueAt;

    // getters and setters impelmented at compile time by lombok
}
