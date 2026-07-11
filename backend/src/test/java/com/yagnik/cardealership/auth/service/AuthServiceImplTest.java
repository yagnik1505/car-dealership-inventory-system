package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.RegisterRequest;
import com.yagnik.cardealership.auth.dto.RegisterResponse;
import com.yagnik.cardealership.auth.entity.User;
import com.yagnik.cardealership.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void shouldSaveUserAndReturnSuccessResponse() {

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

        verify(userRepository, times(1))
                .save(any(User.class));
    }
}