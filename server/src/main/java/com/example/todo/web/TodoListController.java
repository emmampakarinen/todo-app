package com.example.todo.web;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.todo.model.*;
import com.example.todo.service.JwtService;
import com.example.todo.service.ListService;
import com.example.todo.web.dto.NewTodoDTO;
import com.example.todo.web.dto.ListDTO;
import com.example.todo.web.dto.NewListDTOResponse;

@RestController @RequestMapping("/api")
public class TodoListController {
    private final ListService service; 
    private final JwtService jwtService;
    
    public TodoListController(ListService service, JwtService jwtService) { 
        this.service = service; this.jwtService = jwtService; 
    }

    // returning all lists for a user
    @GetMapping("/lists")
    public List<TodoList> lisTodoLists(@RequestHeader("Authorization") String header) {
        String token = header.substring(7); // remove "Bearer "
        Long currentUserId = jwtService.userId(token);

        return service.listTodoLists(currentUserId);
    }
    
    // creating a new list for a user
    @PostMapping("/lists")
    public ResponseEntity<NewListDTOResponse> createTodoList(
        @RequestBody ListDTO body,
        @RequestHeader("Authorization") String header
    ) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        // create the new list
        TodoList created = service.createTodoList(currentUserId, body);
        if (created == null) {
            return ResponseEntity.badRequest().build();
        }

         // prepare response body
        NewListDTOResponse dto = new NewListDTOResponse(
        created.getId(),
        created.getListName(),
        created.getDescription()
        );

        // return 201 Created with Location header
        URI location = URI.create("/api/lists/" + created.getId());
        return ResponseEntity.created(location).body(dto);

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
    @GetMapping("/weeks/{monday}/todos")
    public List<Todo> weeklyTodos(
        @PathVariable String monday, 
        @RequestHeader("Authorization") String header
    ) {
        String token = header.substring(7);
        Long currentUserId = jwtService.userId(token);

        return service.weeklyTodos(currentUserId, LocalDate.parse(monday));
    }
    
}
