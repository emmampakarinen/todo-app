package com.example.todo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    // getters/setters
    public long getId() { return id; }
    public void setId(Long id) { this.id = id; };

    public Week getWeek() { return week; }
    public void setWeek(Week week) { this.week = week; };

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; };

    public Boolean getDone() { return done; }
    public void setDone(Boolean done) { this.done = done; };

    public Integer position() { return position; }
    public void setPosition(Integer position) { this.position = position; };

    public LocalDateTime dueAt() { return dueAt; }
    public void setDueAt(LocalDateTime dueAt) { this.dueAt = dueAt; };
}
