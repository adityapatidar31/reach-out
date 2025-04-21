package com.reach.out.Rest;

import com.reach.out.Dto.PasswordUpdateRequest;
import com.reach.out.Dto.UpdateUserNameRequest;
import com.reach.out.Model.User;
import com.reach.out.Security.JwtUtil;
import com.reach.out.Services.UserService;
import com.reach.out.Utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PreAuthorize("isAuthenticated()")
    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> updateProfileImage(@RequestParam("image") MultipartFile image) {
        User updatedUser = userService.updateProfileImage(image);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("data", updatedUser);

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/password")
    public ResponseEntity<Map<String,Object>> updateUserPassword(
            @Valid @RequestBody PasswordUpdateRequest passwordUpdateRequest,
            HttpServletResponse response
    ){

        User user=userService.updateUserPassword(passwordUpdateRequest);

        Map<String, Object> res=new HashMap<>();
        res.put("status","success");
        res.put("data",user);

        String token = jwtUtil.generateToken(user.getId(),user.getRole());
        CookieUtils.setJwtCookie(response, token);

        return ResponseEntity.ok(res);
    }


}
