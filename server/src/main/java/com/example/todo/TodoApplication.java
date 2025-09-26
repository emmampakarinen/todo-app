package com.example.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.todo.model.User;
import com.example.todo.repo.UserRepository;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean CommandLineRunner seed(UserRepository users) {
    return args -> users.findByEmail("demo@example.com").orElseGet(() -> {
      var u = User.builder()
      .username("demouser")
      .email("demo@example.com")
      .passwordHash("{noop}dev")
      .build();
      return users.save(u);
    });
  }
}
