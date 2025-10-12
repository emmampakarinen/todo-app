package com.example.todo.web;

import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.todo.model.*;
import com.example.todo.service.ListService;
import com.example.todo.web.dto.NewTodoDTO;
import com.example.todo.web.dto.NewListDTO;

@RestController @RequestMapping("/api")
public class TodoListController {
    private final ListService service; 
    public TodoListController(ListService service) { this.service = service; }

    private Long currentUserId() { return 1L; } // temp

    // returning all lists for a user
    @GetMapping("/lists")
    public List<TodoList> lisTodoLists() {
        return service.listTodoLists(currentUserId());
    }
    
    // creating a new list for a user
    @PostMapping("(/lists)")
    public TodoList createTodoList(@RequestBody NewListDTO body) {
        
        return service.createTodoList(currentUserId(), body.listName());
    }

    // listing specific list's todos
    @GetMapping("/lists/{id}/todos")
    public List<Todo> listTodos(@PathVariable Long id) {
        return service.listTodos(id);
    }

    // create a new to do for a list
    @PostMapping("/todos")
    public Todo addTodo(@RequestBody NewTodoDTO body) {
        return service.addTodo(body.todoListId(), body.title());
    }
    
    // todo is either done or not done, which can be changed
    @PatchMapping("todos/{id}/done/{done}")
    public Todo toggleDone(@PathVariable Long id, @PathVariable boolean done) {
        return service.toggleDone(id, done);
    }

    // weekly view - list all todos due this week for a user
    @GetMapping("/lists/{monday}/todos")
    public List<Todo> weeklyTodos(@PathVariable String monday) {
        return service.weeklyTodos(currentUserId(), LocalDate.parse(monday));
    }
    
}
