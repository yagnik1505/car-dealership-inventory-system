package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.RegisterRequest;
import com.yagnik.cardealership.auth.dto.RegisterResponse;
import com.yagnik.cardealership.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void shouldRegisterUserSuccessfully() {

        RegisterRequest request = RegisterRequest.builder()
                .name("Yagnik")
                .email("yagnik@gmail.com")
                .password("Password@123")
                .build();

        RegisterResponse response = authService.register(request);

        assertNotNull(response);

        assertEquals(
                "User registered successfully",
                response.getMessage()
        );
    }

}