package com.reach.out.Services;

import com.reach.out.Dto.SignupRequest;
import com.reach.out.Model.User;

public interface UserService {
    User registerUser(SignupRequest signupRequest);
}