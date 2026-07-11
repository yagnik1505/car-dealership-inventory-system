package com.yagnik.cardealership.auth.service;

import org.junit.jupiter.api.Test;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertFalse;
import com.yagnik.cardealership.auth.security.*;

public class JwtServiceTest {

    @Test
    void shouldGenerateJwtToken() {

        JwtService jwtService = new JwtService();

        String token = jwtService.generateToken("john@example.com");

        assertNotNull(token);
        assertFalse(token.isBlank());
    }
}
