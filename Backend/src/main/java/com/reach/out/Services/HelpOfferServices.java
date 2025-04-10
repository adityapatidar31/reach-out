package com.reach.out.Services;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Model.HelpOffer;

import java.util.List;

public interface HelpOfferServices {
    List<HelpOffer> getAllHelpOffer();
    HelpOffer createHelpOfferRequest(HelpOfferRequest helpOfferRequest);
}
