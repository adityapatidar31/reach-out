package com.reach.out.Rest;

import com.reach.out.Dto.UpdateUserNameRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Security.JwtUtil;
import com.reach.out.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/name")
    public ResponseEntity<Map<String,Object>> updateUserName(@Valid @RequestBody UpdateUserNameRequest request){
        System.out.println(request.getName());
        User updatedUser=userService.updateUserName(request.getName());

        Map<String,Object> response= new HashMap<>();

        response.put("status","success");
        response.put("data",updatedUser);
        return ResponseEntity.ok(response);

    }


}
