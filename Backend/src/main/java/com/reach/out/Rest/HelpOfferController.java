package com.reach.out.Rest;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Dto.HelpOfferResponse;
import com.reach.out.Dto.HelpOfferResponseByUser;
import com.reach.out.Dto.HelpOfferStatusUpdateRequest;
import com.reach.out.Response.ApiResponse;
import com.reach.out.Services.HelpOfferServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/help-offer")
public class HelpOfferController {

    private final HelpOfferServices helpOfferServices;

    @Autowired
    public HelpOfferController(HelpOfferServices helpOfferServices) {
        this.helpOfferServices = helpOfferServices;
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAllHelpOffer() {
        Map<String, Object> response = new HashMap<>();

        List<HelpOfferResponse> helps = helpOfferServices.getAllHelpOffer();

        response.put("status", "success");
        response.put("data", helps);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createHelpOfferRequest(
            @Valid @RequestBody HelpOfferRequest helpOfferRequest) {

        Map<String, Object> response = new HashMap<>();

        HelpOfferResponse helpOffer = helpOfferServices.createHelpOfferRequest(helpOfferRequest);

        response.put("status", "success");
        response.put("data", helpOffer);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateHelpOfferRequestStatus(
            @PathVariable Long id,
            @Valid @RequestBody HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest) {

        Map<String, Object> response = new HashMap<>();

        HelpOfferResponse updatedHelpOffer = helpOfferServices.updateHelpStatusById(id, helpOfferStatusUpdateRequest);

        response.put("status", "success");
        response.put("data", updatedHelpOffer);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpOfferRequestById(@PathVariable Long id) {
        helpOfferServices.deleteHelpOfferById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getAllHelpOfferByUserId(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();

        List<HelpOfferResponseByUser> allHelpOfferedByUser = helpOfferServices.getAllHelpOfferByUserId(userId);

        response.put("status", "success");
        response.put("data", allHelpOfferedByUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/help/{helpId}/user/{userId}")
    public ResponseEntity<ApiResponse<HelpOfferResponse>> getHelpOfferByHelpIdAndUserId(
            @PathVariable Long helpId,
            @PathVariable Long userId) {

        Optional<HelpOfferResponse> offerOpt = helpOfferServices.getOfferByHelpIdAndUserId(helpId, userId);

        if (offerOpt.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(offerOpt.get(), "Success"));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(null, "Success"));
        }
    }
}
