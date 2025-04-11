package com.reach.out.Services;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Dto.HelpOfferStatusUpdateRequest;
import com.reach.out.Dto.HelpOfferResponse;

import java.util.List;
import java.util.Optional;

public interface HelpOfferServices {
    List<HelpOfferResponse> getAllHelpOffer();
    HelpOfferResponse createHelpOfferRequest(HelpOfferRequest helpOfferRequest);
    HelpOfferResponse updateHelpStatusById(Long id, HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest);
    void deleteHelpOfferById(Long id);
    List<HelpOfferResponse> getAllHelpOfferByUserId(Long userId);
    Optional<HelpOfferResponse> getOfferByHelpIdAndUserId(Long helpId, Long userId);
}
