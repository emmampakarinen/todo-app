package com.example.todo.model;

import java.time.LocalDate;
import java.util.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name="lists", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "list_name"}))
public class TodoList {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user can have many todo lists
    @ManyToOne(optional=false) 
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name="list_name", nullable=false, length=120)
    private String listName;

    @OneToMany(
        mappedBy="todoList", 
        cascade=CascadeType.ALL, 
        orphanRemoval=true
        )
    @OrderBy("position ASC, id ASC")
    private List<Todo> todos = new ArrayList<>();

    // getters and setters implemented at compile time by lombok  
    
}
