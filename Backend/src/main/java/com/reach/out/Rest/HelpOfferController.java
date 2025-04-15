package com.reach.out.Rest;

import com.reach.out.Dto.*;
import com.reach.out.Response.ApiResponse;
import com.reach.out.Security.AuthUtils;
import com.reach.out.Services.HelpOfferServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/help-offers")
public class HelpOfferController {

    private final HelpOfferServices helpOfferServices;

    public HelpOfferController(HelpOfferServices helpOfferServices) {
        this.helpOfferServices = helpOfferServices;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getAllHelpOffer() {
        Map<String, Object> response = new HashMap<>();

        List<HelpOfferResponse> helps = helpOfferServices.getAllHelpOffer();

        response.put("status", "success");
        response.put("data", helps);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createHelpOfferRequest(
            @Valid @RequestBody HelpOfferRequest helpOfferRequest) {

        Map<String, Object> response = new HashMap<>();

        HelpOfferResponse helpOffer = helpOfferServices.createHelpOfferRequest(helpOfferRequest);

        response.put("status", "success");
        response.put("data", helpOffer);

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
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

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelpOfferRequestById(@PathVariable Long id) {
        helpOfferServices.deleteHelpOfferById(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getAllHelpOfferByUserId() {
        Map<String, Object> response = new HashMap<>();

        Long userId= AuthUtils.getCurrentUserId();
        List<HelpOfferResponseByUser> allHelpOfferedByUser = helpOfferServices.getAllHelpOfferByUserId(userId);

        response.put("status", "success");
        response.put("data", allHelpOfferedByUser);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/help/{helpId}/user")
    public ResponseEntity<ApiResponse<HelpOfferResponse>> getHelpOfferByHelpIdAndUserId(
            @PathVariable Long helpId) {

        Long userId= AuthUtils.getCurrentUserId();
        Optional<HelpOfferResponse> offerOpt = helpOfferServices.getOfferByHelpIdAndUserId(helpId, userId);

        if (offerOpt.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(offerOpt.get(), "Success"));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(null, "Success"));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/help/{helpId}")
    public ResponseEntity<Map<String, Object>> getAllHelpOfferByHelpId(@PathVariable Long helpId) {
        Map<String, Object> response = new HashMap<>();

        List<HelpOfferResponseWithUser> offers = helpOfferServices.getAllHelpOfferByHelpId(helpId);

        response.put("status", "success");
        response.put("data", offers);
        return ResponseEntity.ok(response);
    }

}
