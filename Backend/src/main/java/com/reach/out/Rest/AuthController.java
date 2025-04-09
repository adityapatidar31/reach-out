package com.reach.out.Rest;

import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Model.User;
import com.reach.out.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<Map<String, Object>> signUpUser(@RequestBody SignupRequest signupRequest){
        Map<String, Object> response=new HashMap<>();
        Map<String, String> data = new HashMap<>();

        data.put("name", signupRequest.getName());
        data.put("email", signupRequest.getEmail());
        data.put("password", signupRequest.getPassword());
        data.put("confirmPassword", signupRequest.getConfirmPassword());
        User user=userService.registerUser(signupRequest);
        response.put("status","success");
        response.put("data", user);

        return  ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginUser(@RequestBody LoginRequest loginRequest){

        Map <String, Object> response=new HashMap<>();
        Map <String, String> data= new HashMap<>();

        data.put("email", loginRequest.getEmail());
        data.put("password", loginRequest.getPassword());

        response.put("status","success");
        response.put("data",data);
        return ResponseEntity.ok(response);
    }
}
