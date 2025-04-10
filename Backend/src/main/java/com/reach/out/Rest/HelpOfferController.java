package com.reach.out.Rest;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Dto.HelpOfferStatusUpdateRequest;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Services.HelpOfferServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/help-offer")
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

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateHelpOfferRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest
    ){
        Map<String, Object> response=new HashMap<>();

        HelpOffer updatedHelpOffer= helpOfferServices.updateHelpStatusById(id,helpOfferStatusUpdateRequest);

        response.put("status","success");
        response.put("data",updatedHelpOffer);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpOfferRequestById(
            @PathVariable Long id
    ){
        helpOfferServices.deleteHelpOfferById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String,Object>> getAllHelpOfferByUserId(@PathVariable Long userId){
        Map<String, Object> response= new HashMap<>();

        List<HelpOffer> allHelpOfferedByUser= helpOfferServices.getAllHelpOfferByUserId(userId);

        response.put("status", "success");
        response.put("data",allHelpOfferedByUser);
        return ResponseEntity.ok(response);
    }
}
