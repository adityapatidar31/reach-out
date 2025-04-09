package com.reach.out.Rest;

import com.reach.out.Rest.Dto.LoginRequest;
import com.reach.out.Rest.Dto.SignupRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @PostMapping("/signUp")
    public ResponseEntity<Map<String, Object>> signUpUser(@RequestBody SignupRequest signupRequest){
        Map<String, Object> response=new HashMap<>();
        Map<String, String> data = new HashMap<>();

        data.put("name", signupRequest.getName());
        data.put("email", signupRequest.getEmail());
        data.put("password", signupRequest.getPassword());
        data.put("confirmPassword", signupRequest.getConfirmPassword());
        response.put("status","success");
        response.put("data", data);

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
