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
  
  @Autowired
  private JwtAuthFilter jwtAuthFilter;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // hashing algorithm 
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http) throws Exception {
    //boolean isDev = Arrays.asList(env.getActiveProfiles()).contains("dev");
    http
      .csrf(csrf -> csrf.disable())
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
        .requestMatchers("/api/health").permitAll()
        .requestMatchers("/api/auth/**").permitAll() 
        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/v3/api-docs.yaml").permitAll()
        .anyRequest().permitAll())
    .addFilterBefore(
      jwtAuthFilter, 
      org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
    ); // JWT filter
    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
      var c = new CorsConfiguration();

      c.setAllowedOriginPatterns(List.of(
          "http://localhost:*",
          "http://127.0.0.1:*",
          "https://checkitup.netlify.app"
      ));

      c.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
      c.setAllowCredentials(true);
      c.setAllowedHeaders(List.of("*"));
      c.setExposedHeaders(List.of("Authorization"));

      var source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", c);
      return source;
  }
}
