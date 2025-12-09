package com.example.todo.repo;
import com.example.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // find all todos for a specific list, ordered by position ascending
    List<Todo> findByTodoList_IdOrderByPositionAsc(Long listId);

    // find all todos for a user that are due between two dates, ordered by due date ascending
    List<Todo> findByTodoList_IdAndDueAtBetweenOrderByDueAtAsc(
        Long listId, LocalDateTime startInclusive, LocalDateTime endExclusive
    );

    // count how many todos are in a specific list
    long countByTodoList_Id(Long listId);

    @Query("""
    select t from Todo t
    where t.done = false
      and t.reminderSent = false
      and t.dueAt = :dueAt
      and t.user.emailVerified = true
    """)
    List<Todo> findRemindableTodos(@Param("dueAt") LocalDate dueAt);
}
