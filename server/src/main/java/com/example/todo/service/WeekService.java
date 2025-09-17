package com.example.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.model.*;
import com.example.todo.repo.*;

import jakarta.transaction.Transactional;

@Service
public class WeekService {
    private final WeekRepository weeks;
    private final UserRepository users; 
    private final TodoRepository todos; 

    public WeekService(WeekRepository weeks, UserRepository users, TodoRepository todos) {
        this.weeks = weeks; 
        this.users = users; 
        this.todos = todos; 
    }

    // returning list of user's weeks 
    public List<Week> listWeeks(Long userId) {
        return weeks.findByUserIdOrderByWeekStartDesc(userId);
    }

    // creating a new week for a user
    @Transactional
    public Week createWeek(Long userId, LocalDate monday) {
        var user = users.findById(userId).orElseThrow();
        return weeks.findByUserIdAndWeekStart(userId, monday)
            .orElseGet(() -> {
                var w = new Week();
                w.setUser(user); 
                w.setWeekStart(monday);
                return weeks.save(w);
            });
    }

    // listing specific week's todos
    public List<Todo> listTodos(Long weekId) {
        return todos.findByWeekIdOrderByPositionAsc(weekId);
    } 

    // create a new to do for the current week
    @Transactional
    public Todo addTodo(Long weekId, String title) {
        var week = weeks.findById(weekId).orElseThrow();

        var t = new Todo();
        t.setWeek(week);
        t.setTitle(title);
        
        return t; 
    } 

    // todo is either done or not done, which can be changed
    @Transactional
    public Todo toggleDone(Long todoId, boolean done) {
        var t = todos.findById(todoId).orElseThrow();
        t.setDone(done);
        return t;
    }
}
