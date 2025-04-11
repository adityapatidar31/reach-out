package com.reach.out.Mapper;

import com.reach.out.Dto.HelpOfferResponse;
import com.reach.out.Model.HelpOffer;

public class HelpOfferMapper {

    public static HelpOfferResponse toResponse(HelpOffer helpOffer) {
        if (helpOffer == null) return null;

        return new HelpOfferResponse(
                helpOffer.getId(),
                helpOffer.getHelp().getId(),
                helpOffer.getOfferedBy().getId(),
                helpOffer.getMessage(),
                helpOffer.getStatus(),
                helpOffer.getCreatedAt()
        );
    }
}
