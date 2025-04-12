package com.reach.out.Mapper;

import com.reach.out.Dto.HelpAllResponse;
import com.reach.out.Model.Help;

public class HelpMapper {

    public static HelpAllResponse toHelpAllResponse(Help help) {
        if (help == null) return null;

        HelpAllResponse response = new HelpAllResponse();
        response.setId(help.getId());
        response.setTitle(help.getTitle());
        response.setDescription(help.getDescription());
        response.setHelpImageUrl(help.getHelpImageUrl());
        response.setArea(help.getArea());
        response.setCity(help.getCity());
        response.setState(help.getState());
        response.setCountry(help.getCountry());
        response.setPincode(help.getPincode());
        response.setType(help.getType());
        response.setStatus(help.getStatus());
        response.setReward(help.getReward());
        response.setCategories(help.getCategories());
        response.setCreatedAt(help.getCreatedAt());

        return response;
    }
}
