package com.reach.out.Rest;

import com.reach.out.Dto.LoginRequest;
import com.reach.out.Dto.SignupRequest;
import com.reach.out.Model.User;
import com.reach.out.Security.AuthUtils;
import com.reach.out.Security.JwtUtil;
import com.reach.out.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signUp")
    public ResponseEntity<Map<String, Object>> signUpUser(
            @Valid @RequestBody SignupRequest signupRequest,
            HttpServletResponse response) {

        User user = userService.registerUser(signupRequest);
        String token = jwtUtil.generateToken(user.getId(),user.getRole());

        setJwtCookie(response, token);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "success");
        res.put("data", user);
        res.put("token", token);

        return ResponseEntity.ok(res);
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response) {

        User user = userService.loginUser(loginRequest);
        String token = jwtUtil.generateToken(user.getId(),user.getRole());

        setJwtCookie(response, token);

        Map<String, Object> res = new HashMap<>();
        res.put("status", "success");
        res.put("data", user);
        res.put("token", token);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/is-login")
    public ResponseEntity<Map<String,Object>> getUserWithToken(){
        Map<String,Object> response= new HashMap<>();

        Long userId= AuthUtils.getCurrentUserId();
        response.put("status","success");
        if(userId==null){
            return ResponseEntity.ok(response);
        }
        User user=userService.getUserById(userId);
        response.put("data",user);
        return ResponseEntity.ok(response);
    }

    private void setJwtCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Set to true in production (HTTPS)
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }

}
