package com.example.todo.repo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username); 
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByVerificationToken(String token);
}
