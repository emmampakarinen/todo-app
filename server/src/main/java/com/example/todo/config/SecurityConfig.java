package com.example.todo.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;

@Configuration
public class SecurityConfig {

  @Autowired
  private Environment env;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // hashing algorithm 
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http) throws Exception {
     boolean isDev = Arrays.asList(env.getActiveProfiles()).contains("dev");
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> {auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
        .requestMatchers("/", "/ping", "/api/auth/**").permitAll()
        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/v3/api-docs.yaml").permitAll();

        if (isDev) {
          // allow all in dev for easier testing
          auth.anyRequest().permitAll();
        } else {
          // secure all endpoints in prod
          auth.anyRequest().authenticated();
        }

  });
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    var c = new CorsConfiguration();
    // allow both localhost and 127.0.0.1 on any dev port
    c.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*", "https://checkitup.netlify.app"));
    c.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("Content-Type","Authorization","X-Requested-With","Accept"));
    c.setAllowCredentials(true); // only if you send cookies/Authorization

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", c);
    return source;
  }
}
