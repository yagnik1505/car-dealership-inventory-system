package com.yagnik.cardealership.auth.security;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(String email) {
        return "dummy-token";
    }
}