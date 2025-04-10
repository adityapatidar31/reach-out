package com.reach.out.Rest;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Services.HelpOfferServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/helpOffer")
public class HelpOfferController {
    private final HelpOfferServices helpOfferServices;

    @Autowired
    public HelpOfferController(HelpOfferServices helpOfferServices){
        this.helpOfferServices=helpOfferServices;
    }

    @GetMapping("")
    public ResponseEntity<Map<String,Object>> getAllHelpOffer(){
        Map<String,Object> response=new HashMap<>();

        List<HelpOffer> helps=helpOfferServices.getAllHelpOffer();

        response.put("status", "success");
        response.put("data",helps);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String,Object>> createHelpOfferRequest(@Valid @RequestBody HelpOfferRequest helpOfferRequest){
        Map<String, Object> response=new HashMap<>();

        HelpOffer helpOffer=helpOfferServices.createHelpOfferRequest(helpOfferRequest);

        response.put("status","success");
        response.put("data",helpOffer);

        return ResponseEntity.ok(response);

    }

}
