package com.example.todo.model;

import java.time.LocalDate;
import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name="weeks", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "week_start"}))
public class Week {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user can have many weeks with todos
    @ManyToOne(optional=false) @JoinColumn(name="user_id")
    private User user;

    @Column(name="week_start", nullable=false)
    private LocalDate weekStart;

    @OneToMany(mappedBy="week", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<Todo> todos = new ArrayList<>();

    // getters/setters
    public long getId() { return id; }
    public void setId(Long id) { this.id = id; };

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }  
    
    public void setWeekStart(LocalDate day) { this.weekStart = day; }
}
