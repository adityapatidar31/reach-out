package com.reach.out.Services;


import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public User registerUser(SignupRequest signupRequest) {
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            throw new ApiException("Passwords do not match");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new ApiException("User already exists");
        }


        // For now, save raw password — we’ll hash later with Spring Security
        String encodedPassword= passwordEncoder.encode(signupRequest.getPassword());

        User user = new User(
                signupRequest.getName(),
                signupRequest.getEmail(),
                encodedPassword,
                "USER"
        );

        return userRepository.save(user);
    }

    public User loginUser(LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password"));

        // Match password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password");
        }

        return user;
    }
}

