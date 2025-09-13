package com.example.todo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${app.cors.origins}") 
    private String corsOrigin; 
    
    @Override public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins(corsOrigin)
        .allowedMethods("GET","POST","PATCH","DELETE","PUT","OPTIONS")
        .allowCredentials(true);
    }
}
