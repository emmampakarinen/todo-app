package com.example.todo.repo;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo.model.Week;

public interface WeekRepository extends JpaRepository<Week, Long>{
    Optional<Week> findByUserIdAndWeekStart(Long userId, LocalDate weekStart);
    List<Week> findByUserIdOrderByWeekStartDesc(Long userId);
}
