package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.security.JwtService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService();

    @Test
    void shouldGenerateJwtToken() {

        String token = jwtService.generateToken("john@example.com");

        assertNotNull(token);
        assertFalse(token.isBlank());

        assertEquals(3, token.split("\\.").length);
    }
}