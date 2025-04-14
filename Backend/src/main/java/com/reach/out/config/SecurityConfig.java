package com.reach.out.config;

import com.reach.out.Security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {}) // Enable default CORS settings
                .authorizeHttpRequests(auth -> auth
                        // Public GET endpoints
                        .requestMatchers(HttpMethod.GET, "/api/v1/helps", "/api/v1/helps/**").permitAll()

                        // Admin-only DELETE endpoints
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/helps/**", "/api/v1/help-offers/**").hasRole("ADMIN")

                        // Authenticated-only endpoints
                        .requestMatchers(
                                HttpMethod.POST, "/api/v1/helps", "/api/v1/help-offers",
                                "/api/v1/helps/**", "/api/v1/help-offers/**"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.PATCH, "/api/v1/helps/**", "/api/v1/help-offers/**"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/helps/user",
                                "/api/v1/help-offers/user",
                                "/api/v1/help-offers/help/**"
                        ).authenticated()

                        // Everything else
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());


        return http.build();
    }
}
