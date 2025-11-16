package com.example.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todo.model.*;
import com.example.todo.repo.*;
import com.example.todo.web.dto.EditTodoDTO;
import com.example.todo.web.dto.NewListRequest;
import com.example.todo.web.dto.TodoDTO;

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
    public TodoList createTodoList(Long userId, NewListRequest list) {
        var user = users.findById(userId).orElseThrow();
        return lists.findByUser_IdAndListName(userId, list.name())
            .orElseGet(() -> {
                var l = new TodoList();
                l.setUser(user); 
                l.setListName(list.name());
                l.setDescription(list.description());
                return lists.save(l);
            });
    }

    // listing specific list's todos
    public List<Todo> listTodos(Long listId) {
        return todos.findByTodoList_IdOrderByPositionAsc(listId);
    } 

    // create a new to do in a specific list
    @Transactional
    public TodoDTO addTodo(Long todoListId, String title, String description, LocalDate dueAt) {
        var list = lists.findById(todoListId).orElseThrow();

        var t = new Todo();
        t.setTodoList(list);
        t.setTitle(title);
        t.setDescription(description);
        t.setDueAt(dueAt);
        
        var saved = todos.save(t); 

        return new TodoDTO(
            saved.getId(),
            saved.getTodoListId(),
            saved.getTitle(),
            saved.getDescription(),
            saved.isDone(),
            saved.getPosition(),
            saved.getDueAt(), 
            saved.getCreatedAt(), 
            saved.getUpdatedAt()
        );
    } 

    // todo is either done or not done, which can be changed
    @Transactional
    public Todo toggleDone(Long todoId, boolean done) {
        var t = todos.findById(todoId).orElseThrow();
        t.setDone(done);
        return t;
    }

    @Transactional
    public Todo editTodo(EditTodoDTO todo) {
        var t = todos.findById(todo.id()).orElseThrow();
        
        if (todo.title() != null) t.setTitle(todo.title());
        if (todo.description() != null) t.setDescription(todo.description());
        if (todo.dueAt() != null) t.setDueAt(todo.dueAt());
        
        t.setUpdatedAt(LocalDate.now());

        return t;
    }

    @Transactional
    public void deleteTodo(Long todoId) {
        todos.deleteById(todoId);
    }

    @Transactional
    public void deleteList(Long listId) {
        lists.deleteById(listId);
    }

    // weekly view - list all todos due this week for a user
    public List<Todo> weeklyTodos(Long userId, LocalDate weekStart) {
        var start = weekStart.atStartOfDay();
        var end = start.plusDays(7);
        return todos.findByTodoList_IdAndDueAtBetweenOrderByDueAtAsc(userId, start, end);
    }
}
