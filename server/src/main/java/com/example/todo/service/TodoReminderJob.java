package com.example.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.todo.model.Todo;
import com.example.todo.repo.TodoRepository;

@Service
public class TodoReminderJob {

    private final TodoRepository todoRepository;
    private final EmailService emailService;

    public TodoReminderJob(TodoRepository todoRepository, EmailService emailService) {
        this.todoRepository = todoRepository;
        this.emailService = emailService;
    }

    // run cronjob every day at 08:00am
    @Scheduled(cron = "0 0 8 * * *")
    public void sendDueTomorrowReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);

        List<Todo> todos = todoRepository.findRemindableTodos(tomorrow);

        for (Todo todo : todos) {
            String email = todo.getUser().getEmail();
            String subject = "Reminder: \"" + todo.getTitle() + "\" is due tomorrow";
            String body = """
                    Hi!

                    Your todo "%s" is due on %s.
                    Remember to finish it or mark it as completed in the app.

                    """.formatted(todo.getTitle(), todo.getDueAt());

            emailService.sendEmail(email, subject, body);

            todo.setReminderSent(true);
        }

        todoRepository.saveAll(todos);
    }
}
