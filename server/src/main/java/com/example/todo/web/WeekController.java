package com.example.todo.web;

import java.time.LocalDate;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.todo.model.*;
import com.example.todo.service.WeekService;
import com.example.todo.web.dto.NewTodoDTO;
import com.example.todo.web.dto.NewWeekDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController @RequestMapping("/api")
public class WeekController {
    private final WeekService service; 
    public WeekController(WeekService service) { this.service = service; }

    private Long currentUserId() { return 1L; } // temp

    @GetMapping("/weeks")
    public List<Week> listWeeks() {
        return service.listWeeks(currentUserId());
    }
    
    @PostMapping("(/weeks)")
    public Week createWeek(@RequestBody NewWeekDTO body) {
        
        return service.createWeek(currentUserId(), LocalDate.parse(body.weekStart()));
    }

    @GetMapping("/weeks/{id}/todos")
    public List<Todo> listTodos(@PathVariable Long id) {
        return service.listTodos(id);
    }

    @PostMapping("/todos")
    public Todo addTodo(@RequestBody NewTodoDTO body) {
        return service.addTodo(body.weekId(), body.title());
    }
    
    @PatchMapping("todos/{id}/done/{done}")
    public Todo toggleDone(@PathVariable Long id, @PathVariable boolean done) {
        return service.toggleDone(id, done);
    }
    
}
