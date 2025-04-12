package com.reach.out.Mapper;

import com.reach.out.Dto.HelpOfferResponse;
import com.reach.out.Dto.HelpOfferResponseWithUser;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Model.User;

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

    public static HelpOfferResponseWithUser toResponseWithUser(HelpOffer helpOffer) {
        User user = helpOffer.getOfferedBy();
        return new HelpOfferResponseWithUser(
                helpOffer.getId(),
                helpOffer.getHelp().getId(),
                helpOffer.getMessage(),
                helpOffer.getStatus(),
                helpOffer.getCreatedAt(),
                helpOffer.getUpdatedAt(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImageUrl() != null ? user.getImageUrl() : "https://example.com/default-user.png"
        );
    }
}
