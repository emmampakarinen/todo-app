package com.example.todo.repo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
