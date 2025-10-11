package com.example.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.model.*;
import com.example.todo.repo.*;

import jakarta.transaction.Transactional;

@Service
public class ListService {
    private final TodoListRepository lists;
    private final UserRepository users; 
    private final TodoRepository todos; 

    public ListService(TodoListRepository lists, UserRepository users, TodoRepository todos) {
        this.lists = lists; 
        this.users = users; 
        this.todos = todos; 
    }

    // returning all lists for a user 
    public List<TodoList> listTodoLists(Long userId) {
        return lists.findByUser_IdOrderByListNameAsc(userId);
    }

    // creating a new list for a user
    @Transactional
    public TodoList createTodoList(Long userId, String listName) {
        var user = users.findById(userId).orElseThrow();
        return lists.findByUser_IdAndListName(userId, listName)
            .orElseGet(() -> {
                var l = new TodoList();
                l.setUser(user); 
                l.setListName(listName);
                return lists.save(l);
            });
    }

    // listing specific list's todos
    public List<Todo> listTodos(Long listId) {
        return todos.findByTodoList_IdOrderByPositionAsc(listId);
    } 

    // create a new to do for the current week
    @Transactional
    public Todo addTodo(Long todoListId, String title) {
        var list = lists.findById(todoListId).orElseThrow();

        var t = new Todo();
        t.setTodoList(list);
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

    // weekly view - list all todos due this week for a user
    public List<Todo> weeklyTodos(Long userId, LocalDate weekStart) {
        var start = weekStart.atStartOfDay();
        var end = start.plusDays(7);
        return todos.findByTodoList_IdAndDueAtBetweenOrderByDueAtAsc(userId, start, end);
    }
}
