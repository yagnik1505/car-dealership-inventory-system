package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.*;
import com.yagnik.cardealership.auth.dto.LoginResponse;
import com.yagnik.cardealership.auth.dto.RegisterRequest;
import com.yagnik.cardealership.auth.dto.RegisterResponse;
import com.yagnik.cardealership.auth.entity.Role;
import com.yagnik.cardealership.auth.entity.User;
import com.yagnik.cardealership.auth.exception.EmailAlreadyExistsException;
import com.yagnik.cardealership.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return RegisterResponse.builder()
                .message("User registered successfully")
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid credentials");
        }

        return LoginResponse.builder()
                .message("Login successful")
                .build();
    }
}