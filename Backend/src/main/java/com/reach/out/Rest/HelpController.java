package com.reach.out.Rest;

import com.reach.out.Dto.HelpAllResponse;
import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.Security.JwtUtil;
import com.reach.out.Services.HelpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/v1/help")
public class HelpController {

    private  final HelpService helpService;
    private final JwtUtil jwtUtil;

    @Autowired
    public HelpController(HelpService helpService, JwtUtil jwtUtil){
        this.helpService=helpService;
        this.jwtUtil=jwtUtil;
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAllHelpRequest(){

        Map<String, Object> response=new HashMap<>();

        List<Help> helps = helpService.getAllHelpRequest();

        List<HelpAllResponse> dtos = helps.stream().map(help -> {
            HelpAllResponse dto = new HelpAllResponse();
            dto.setId(help.getId());
            dto.setTitle(help.getTitle());
            dto.setDescription(help.getDescription());
            dto.setHelpImageUrl(help.getHelpImageUrl());
            dto.setArea(help.getArea());
            dto.setCity(help.getCity());
            dto.setState(help.getState());
            dto.setCountry(help.getCountry());
            dto.setPincode(help.getPincode());
            dto.setType(help.getType());
            dto.setStatus(help.getStatus());
            dto.setReward(help.getReward());
            dto.setCategories(help.getCategories());
            dto.setCreatedAt(help.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());

        response.put("status", "success");
        response.put("data", dtos);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String,Object>> getHelpRequestById(@PathVariable Long id){
        Map<String,Object> response= new HashMap<>();

        Help help= helpService.getHelpById(id);
        response.put("status","success");
        response.put("data",help);

        return ResponseEntity.ok(response);

    }

    @PostMapping("")
    public ResponseEntity<Map<String,Object>> createHelpRequest(@Valid @RequestBody HelpRequest helpRequest){
        Map<String, Object> response= new HashMap<>();

        Help help=helpService.createHelp(helpRequest);
        response.put("status","success");
        response.put("data",help);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateHelpStatusById(
            @PathVariable Long id,
            @Valid @RequestBody HelpPatchRequest patchRequest
    ){
        Map<String,Object> response= new HashMap<>();
        Help updatedHelp= helpService.updateHelpStatusById(id, patchRequest);

        response.put("status","success");
        System.out.println(updatedHelp);
//        response.put("data",updatedHelp);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpRequestById(@PathVariable Long id){
        helpService.deleteHelpById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public  ResponseEntity<?> getAllHelpRequestByUsedId(@CookieValue(name = "access_token", required = false) String token){
        System.out.println(token);
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
        }
        Map<String,Object> response= new HashMap<>();

        Long userId= jwtUtil.extractUserId(token);

        List<Help> allHelpByUserId = helpService.getAllHelpRequestByUserId(userId);

        List<HelpAllResponse> dtos = allHelpByUserId.stream().map(help -> {
            HelpAllResponse dto = new HelpAllResponse();
            dto.setId(help.getId());
            dto.setTitle(help.getTitle());
            dto.setDescription(help.getDescription());
            dto.setHelpImageUrl(help.getHelpImageUrl());
            dto.setArea(help.getArea());
            dto.setCity(help.getCity());
            dto.setState(help.getState());
            dto.setCountry(help.getCountry());
            dto.setPincode(help.getPincode());
            dto.setType(help.getType());
            dto.setStatus(help.getStatus());
            dto.setReward(help.getReward());
            dto.setCategories(help.getCategories());
            dto.setCreatedAt(help.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());

        response.put("status", "success");
        response.put("data", dtos);

        return ResponseEntity.ok(response);
    }


}
