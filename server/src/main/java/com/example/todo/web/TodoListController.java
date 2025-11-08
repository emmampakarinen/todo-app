package com.example.todo.web;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.todo.model.*;
import com.example.todo.service.JwtService;
import com.example.todo.service.ListService;
import com.example.todo.web.dto.NewTodoDTO;
import com.example.todo.web.dto.TodoDTO;
import com.example.todo.web.dto.TodoListDTO;
import com.example.todo.web.dto.NewListRequest;
import com.example.todo.web.dto.NewListResponse;

@RestController @RequestMapping("/api")
public class TodoListController {
    private final ListService service; 
    private final JwtService jwtService;
    
    public TodoListController(ListService service, JwtService jwtService) { 
        this.service = service; this.jwtService = jwtService; 
    }

    // returning all lists for a user
    @GetMapping("/lists")
    public List<TodoListDTO> lisTodoLists(@RequestHeader("Authorization") String header) {
        String token = header.substring(7); // remove "Bearer "
        Long currentUserId = jwtService.userId(token);

        return service.listTodoLists(currentUserId).stream()
            .map(l -> new TodoListDTO(
                l.getId(),
                l.getListName(),
                l.getDescription(),
                l.getTodos().stream()
                    .map(t -> new TodoDTO(
                        t.getId(),
                        l.getId(),
                        t.getTitle(),
                        t.getDescription(),
                        t.isDone(),
                        t.getPosition(),
                        t.getDueAt(), 
                        t.getCreatedAt(),
                        t.getUpdatedAt()
                    ))
                    .toList()
            ))
            .toList();
    }
    
    // creating a new list for a user
    @PostMapping("/lists")
    public ResponseEntity<NewListResponse> createTodoList(
        @RequestBody NewListRequest body,
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
        NewListResponse dto = new NewListResponse(
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
    public TodoDTO addTodo(@RequestBody NewTodoDTO body) {
        return service.addTodo(body.todoListId(), body.title(), body.description(), body.dueAt());
    }
    
    // todo is either done or not done, which can be changed
    @PatchMapping("todos/{id}/done/{done}")
    public Todo toggleDone(@PathVariable Long id, @PathVariable boolean done) {
        return service.toggleDone(id, done);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        service.deleteTodo(id);
        return ResponseEntity.noContent().build(); // returns 204 No Content
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
