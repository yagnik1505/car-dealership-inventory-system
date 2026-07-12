package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.LoginRequest;
import com.yagnik.cardealership.auth.dto.LoginResponse;
import com.yagnik.cardealership.auth.dto.RegisterRequest;
import com.yagnik.cardealership.auth.dto.RegisterResponse;
import com.yagnik.cardealership.auth.entity.User;
import com.yagnik.cardealership.auth.exception.EmailAlreadyExistsException;
import com.yagnik.cardealership.auth.repository.UserRepository;
import com.yagnik.cardealership.auth.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Optional;

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

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Test
    void shouldSaveUserAndReturnSuccessResponse() {

        RegisterRequest request = RegisterRequest.builder()
                .name("Yagnik")
                .email("yagnik@gmail.com")
                .password("Password@123")
                .build();

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode(request.getPassword()))
                .thenReturn("encryptedPassword");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("User registered successfully", response.getMessage());

        verify(userRepository).save(any(User.class));
        verify(passwordEncoder).encode(request.getPassword());
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

        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
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

        when(passwordEncoder.encode("password123"))
                .thenReturn("encryptedPassword");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();

        assertEquals("encryptedPassword", savedUser.getPassword());

        verify(passwordEncoder).encode("password123");
    }

    // cases for login

    @Test
    void shouldLoginSuccessfully() {

        LoginRequest request = LoginRequest.builder()
                .email("john@example.com")
                .password("Password@123")
                .build();

        User user = User.builder()
                .email("john@example.com")
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()))
                .thenReturn(true);

        LoginResponse response = authService.login(request);

        assertNotNull(response);

        assertEquals(
                "Login successful",
                response.getMessage()
        );

        verify(passwordEncoder).matches(
                request.getPassword(),
                user.getPassword()
        );
    }

    @Test
    void shouldThrowExceptionWhenEmailDoesNotExist() {

        LoginRequest request = LoginRequest.builder()
                .email("unknown@example.com")
                .password("Password@123")
                .build();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals(
                "Invalid credentials",
                exception.getMessage()
        );

        verify(passwordEncoder, never())
                .matches(anyString(), anyString());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsIncorrect() {

        LoginRequest request = LoginRequest.builder()
                .email("john@example.com")
                .password("WrongPassword")
                .build();

        User user = User.builder()
                .email("john@example.com")
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()))
                .thenReturn(false);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals(
                "Invalid credentials",
                exception.getMessage()
        );

        verify(passwordEncoder).matches(
                request.getPassword(),
                user.getPassword()
        );
    }

    @Test
    void shouldReturnJwtTokenAfterSuccessfulLogin() {

        LoginRequest request = LoginRequest.builder()
                .email("john@example.com")
                .password("Password@123")
                .build();

        User user = User.builder()
                .email("john@example.com")
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()))
                .thenReturn(true);

        when(jwtService.generateToken(request.getEmail()))
                .thenReturn("jwt-token");

        LoginResponse response = authService.login(request);

        assertEquals("Login successful", response.getMessage());

        assertEquals("jwt-token", response.getToken());

        verify(jwtService).generateToken(request.getEmail());
    }
}