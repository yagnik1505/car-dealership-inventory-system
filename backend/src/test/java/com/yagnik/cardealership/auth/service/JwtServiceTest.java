package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.entity.Role;
import com.yagnik.cardealership.auth.entity.User;
import com.yagnik.cardealership.auth.security.CustomUserDetails;
import com.yagnik.cardealership.auth.security.JwtService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    private User createUser() {
        return User.builder()
                .id(1L)
                .name("John")
                .email("john@example.com")
                .password("password")
                .role(Role.USER)
                .build();
    }

    @Test
    void shouldExtractUsernameFromToken() {

        User user = createUser();

        String token = jwtService.generateToken(user);

        String username = jwtService.extractUsername(token);

        assertEquals("john@example.com", username);
    }

    @Test
    void shouldGenerateJwtToken() {

        User user = createUser();

        String token = jwtService.generateToken(user);

        assertNotNull(token);
        assertFalse(token.isBlank());

        assertEquals(3, token.split("\\.").length);
    }

    @Test
    void shouldValidateToken() {

        User user = createUser();

        String token = jwtService.generateToken(user);

        CustomUserDetails userDetails =
                new CustomUserDetails(user);

        boolean valid =
                jwtService.isTokenValid(token, userDetails);

        assertTrue(valid);
    }

    @Test
    void shouldContainRoleClaim() {

        User user = createUser();

        String token = jwtService.generateToken(user);

        String role = jwtService.extractRole(token);

        assertEquals("USER", role);
    }
}