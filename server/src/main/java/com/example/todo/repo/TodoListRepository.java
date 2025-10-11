package com.example.todo.repo;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo.model.TodoList;

public interface TodoListRepository extends JpaRepository<TodoList, Long>{
    // returns all lists for a user, ordered by list name ascending
    List<TodoList> findByUser_IdOrderByListNameAsc(Long userId);

    // find a specific list for a user by list name
    Optional<TodoList> findByUser_IdAndListName(Long userId, String listName);
}
