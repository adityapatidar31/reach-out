package com.reach.out.Services;

import com.reach.out.Dto.*;

import java.util.List;
import java.util.Optional;

public interface HelpOfferServices {
    List<HelpOfferResponse> getAllHelpOffer();
    HelpOfferResponse createHelpOfferRequest(HelpOfferRequest helpOfferRequest);
    HelpOfferResponse updateHelpStatusById(Long id, HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest);
    void deleteHelpOfferById(Long id);
    List<HelpOfferResponseByUser> getAllHelpOfferByMe();
    Optional<HelpOfferResponse> getOfferByHelpIdAndUserId(Long helpId);
    List<HelpOfferResponseWithUser> getAllHelpOfferByHelpId(Long helpId);

}
