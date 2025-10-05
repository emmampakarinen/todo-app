package com.example.todo.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.*;

@Configuration
public class SecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // hashing algorithm 
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
        .requestMatchers("/", "/ping", "/api/auth/**").permitAll()
        .anyRequest().permitAll() // keep open while building; lock down later
      );
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    var c = new CorsConfiguration();
    // allow both localhost and 127.0.0.1 on any dev port
    c.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
    c.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("Content-Type","Authorization","X-Requested-With","Accept"));
    c.setAllowCredentials(true); // only if you send cookies/Authorization

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", c);
    return source;
  }
}
