package com.reach.out.Services;


import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new ApiException("User already exists");
        }


        // For now, save raw password — we’ll hash later with Spring Security
        User user = new User(
                signupRequest.getName(),
                signupRequest.getEmail(),
                signupRequest.getPassword(),
                "USER"
        );

        return userRepository.save(user);
    }

    public User loginUser(LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password"));

        // Match password
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new ApiException("Invalid email or password");
        }

        return user;
    }
}

