package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.RegisterRequest;
import com.yagnik.cardealership.auth.dto.RegisterResponse;
import com.yagnik.cardealership.auth.entity.User;
import com.yagnik.cardealership.auth.exception.EmailAlreadyExistsException;
import com.yagnik.cardealership.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void shouldSaveUserAndReturnSuccessResponse() {

        RegisterRequest request = RegisterRequest.builder()
                .name("Yagnik")
                .email("yagnik@gmail.com")
                .password("Password@123")
                .build();

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("User registered successfully", response.getMessage());

        verify(userRepository, times(1))
                .save(any(User.class));
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        RegisterRequest request = RegisterRequest.builder()
                .name("Yagnik")
                .email("yagnik@gmail.com")
                .password("Password@123")
                .build();

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(true);

        EmailAlreadyExistsException exception = assertThrows(
                EmailAlreadyExistsException.class,
                () -> authService.register(request)
        );

        assertEquals("Email already exists", exception.getMessage());

        verify(userRepository, never())
                .save(any(User.class));
    }

    @Test
    void shouldEncryptPasswordBeforeSavingUser() {

        RegisterRequest request = RegisterRequest.builder()
                .name("John Doe")
                .email("john@example.com")
                .password("password123")
                .build();

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encryptedPassword");

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();

        assertEquals("encryptedPassword", savedUser.getPassword());

        verify(passwordEncoder).encode("password123");
    }
}