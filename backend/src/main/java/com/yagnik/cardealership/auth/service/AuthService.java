package com.yagnik.cardealership.auth.service;

import com.yagnik.cardealership.auth.dto.*;

public interface AuthService {
    RegisterResponse register(RegisterRequest request);
}