package com.reach.out.Rest;

import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.Services.HelpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/help")
public class HelpController {

    private  final HelpService helpService;

    @Autowired
    public HelpController(HelpService helpService){
        this.helpService=helpService;
    }

    @PostMapping("")
    public ResponseEntity<Map<String,Object>> createHelpRequest(@Valid @RequestBody HelpRequest helpRequest){
        Map<String, Object> response= new HashMap<>();

        Help help=helpService.createHelp(helpRequest);
        response.put("status","success");
        response.put("data",help);
        return ResponseEntity.ok(response);
    }
}
