package com.reach.out.Rest;

import com.reach.out.Dto.HelpAllResponse;
import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.Security.AuthUtils;
import com.reach.out.Services.HelpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/v1/helps")
public class HelpController {

    private  final HelpService helpService;

    public HelpController(HelpService helpService){
        this.helpService=helpService;
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

    @PreAuthorize("isAuthenticated()")
    @PostMapping("")
    public ResponseEntity<Map<String,Object>> createHelpRequest(@Valid @RequestBody HelpRequest helpRequest){
        Map<String, Object> response= new HashMap<>();

        Help help=helpService.createHelp(helpRequest);
        response.put("status","success");
        response.put("data",help);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateHelpStatusById(
            @PathVariable Long id,
            @Valid @RequestBody HelpPatchRequest patchRequest
    ){
        Map<String,Object> response= new HashMap<>();
        helpService.updateHelpStatusById(id, patchRequest);

        response.put("status","success");
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpRequestById(@PathVariable Long id){
        helpService.deleteHelpById(id);

        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public  ResponseEntity<Map<String,Object>> getAllHelpRequestByMe(){

        Map<String,Object> response =new HashMap<>();
        List<Help> allHelpByUserId = helpService.getAllHelpRequestByMe();
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
