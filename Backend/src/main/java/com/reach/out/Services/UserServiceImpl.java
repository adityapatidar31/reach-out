package com.reach.out.Services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.PasswordUpdateRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Repository.UserRepository;
import com.reach.out.Security.AuthUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Cloudinary cloudinary;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, Cloudinary cloudinary) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
        this.cloudinary=cloudinary;
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

    @Override
    public User updateProfileImage(MultipartFile image) {

        User user = AuthUtils.getCurrentUserOrThrow(userRepository);


        if (image == null || image.isEmpty()) {
            throw new ApiException("Image file is required");
        }

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            // Get URL
            String imageUrl = (String) uploadResult.get("secure_url");

            // Save to user
            user.setImageUrl(imageUrl);
            return userRepository.save(user);

        } catch (IOException e) {
            throw new ApiException("Failed to upload image to Cloudinary");
        }
    }

    @Override
    public User updateUserPassword(PasswordUpdateRequest passwordUpdateRequest) {

        if (!passwordUpdateRequest.getNewPassword().equals(passwordUpdateRequest.getNewPasswordConfirm())) {
            throw new ApiException("New password and confirm password do not match");
        }

        User user = AuthUtils.getCurrentUserOrThrow(userRepository);

        // Check if the current password matches
        if (!passwordEncoder.matches(passwordUpdateRequest.getCurrentPassword(), user.getPassword())) {
            throw new ApiException("Invalid current password");
        }

        // Encode the new password
        String encodedNewPassword = passwordEncoder.encode(passwordUpdateRequest.getNewPassword());
        // It will ensure that password update is before the token generation
        user.setPasswordChangedAt(LocalDateTime.now().minusSeconds(10));
        user.setPassword(encodedNewPassword);

        return userRepository.save(user);
    }



}

