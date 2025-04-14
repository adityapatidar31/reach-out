package com.reach.out.Services;

import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Model.User;

public interface UserService {
    User registerUser(SignupRequest signupRequest);
    User loginUser(LoginRequest loginRequest);
    User getUserById(Long userId);
}