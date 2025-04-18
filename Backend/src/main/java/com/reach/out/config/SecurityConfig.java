package com.reach.out.config;

import com.reach.out.Security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {}) // Enable default CORS settings
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers(HttpMethod.GET, "/api/v1/helps", "/api/v1/helps/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/login", "/api/v1/sign-up").permitAll()


                         // Token verification (authenticated)
                        .requestMatchers(HttpMethod.GET, "/api/v1/verify-token").permitAll()

                        // Help (authenticated & admin)
                        .requestMatchers(HttpMethod.POST, "/api/v1/helps").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/helps/{id}").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/helps/me").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/helps/{id}").hasRole("ADMIN")

                        // Help Offers (authenticated & admin)
                        .requestMatchers(HttpMethod.GET, "/api/v1/help-offers").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/help-offers").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/help-offers/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/help-offers/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/help-offers/me").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/help-offers/help/{helpId}/me").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/help-offers/help/{helpId}").authenticated()

                        // Auth Routes
                        .requestMatchers(HttpMethod.POST, "/api/v1/logout").authenticated()

                        // User Routes
                        .requestMatchers(HttpMethod.PATCH,"/api/v1/users/**").authenticated()

                        // Conversation Routes
                        .requestMatchers(HttpMethod.POST,"/api/v1/conversation/**").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/v1/conversation/**").authenticated()

                        // Default: deny anything not explicitly mentioned
                        .anyRequest().denyAll()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());


        return http.build();
    }
}