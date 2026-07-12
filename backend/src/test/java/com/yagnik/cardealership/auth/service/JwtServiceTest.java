package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    @Test
    void shouldExtractUsernameFromToken() {

        String token = jwtService.generateToken("john@example.com");

        String username = jwtService.extractUsername(token);

        assertEquals("john@example.com", username);
    }

    @Test
    void shouldGenerateJwtToken() {

        String token = jwtService.generateToken("john@example.com");

        assertNotNull(token);
        assertFalse(token.isBlank());

        assertEquals(3, token.split("\\.").length);
    }

    @Test
    void shouldValidateToken() {

        String email = "john@example.com";

        String token = jwtService.generateToken(email);

        UserDetails userDetails = User.builder()
                .username(email)
                .password("password")
                .authorities(Collections.emptyList())
                .build();

        boolean valid = jwtService.isTokenValid(token, userDetails);

        assertTrue(valid);
    }
}