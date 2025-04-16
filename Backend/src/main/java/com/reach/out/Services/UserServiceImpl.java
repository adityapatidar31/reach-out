package com.reach.out.Services;


import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Repository.UserRepository;
import com.reach.out.Security.AuthUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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



        String encodedPassword= passwordEncoder.encode(signupRequest.getPassword());

        User user = new User(
                signupRequest.getName(),
                signupRequest.getEmail(),
                encodedPassword,
                "USER",
                signupRequest.getImageUrl()
        );

        return userRepository.save(user);
    }

    @Override
    public User loginUser(LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ApiException("Invalid email or password"));

        // Match password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new ApiException("Invalid email or password");
        }

        return user;
    }

    @Override
    public User getUserById(Long userId){
        return userRepository.findById(userId).orElseThrow(()-> new ApiException("User Does not exist"));
    }

    @Override
    public User updateUserName(String name){

        if (name == null || name.trim().isEmpty()) {
            throw new ApiException("Name cannot be empty");
        }

        Long userId= AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please log in");

        User user=userRepository.findById(userId)
                .orElseThrow(()->new ApiException("User Does not exist"));

        user.setName(name);

        userRepository.save(user);

        return user;
    }
}

