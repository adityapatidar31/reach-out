package com.reach.out.Services;

import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.PasswordUpdateRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User registerUser(SignupRequest signupRequest);
    User loginUser(LoginRequest loginRequest);
    User getUserById(Long userId);
    User updateUserName(String name);
    User updateProfileImage(MultipartFile image);
    User updateUserPassword(PasswordUpdateRequest passwordUpdateRequest);
}