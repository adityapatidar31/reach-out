package com.reach.out.Rest;

import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.Services.HelpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/help")
public class HelpController {

    private  final HelpService helpService;

    @Autowired
    public HelpController(HelpService helpService){
        this.helpService=helpService;
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAllHelpRequest(){
        Map<String, Object> response= new HashMap<>();
        List<Help> helps = helpService.getAllHelpRequest();
        response.put("status","success");
        response.put("data", helps);

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpRequestById(@PathVariable Long id){
        helpService.deleteHelpById(id);

        return ResponseEntity.noContent().build();
    }

    

}
