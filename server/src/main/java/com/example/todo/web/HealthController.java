package com.example.todo.web;

import org.springframework.web.bind.annotation.*;


@RestController @RequestMapping("/api")
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "backend ok";
    }
}
