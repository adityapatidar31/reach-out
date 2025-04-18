package com.reach.out.Mapper;

import com.reach.out.Dto.Conversation.ConversationSummaryResponse;
import com.reach.out.Model.Conversation;

public class ConversationMapper {

    public static ConversationSummaryResponse mapToConversationSummary(Conversation conversation) {
        ConversationSummaryResponse response = new ConversationSummaryResponse();
        response.setConversationId(conversation.getId());
        response.setHelpId(conversation.getHelp().getId());
        response.setHelpTitle(conversation.getHelp().getTitle());
        response.setHelpCreatorName(conversation.getRequester().getName());
        response.setHelpCreatorImageUrl(conversation.getRequester().getImageUrl());
        response.setHelpOfferId(conversation.getHelpOffer().getId());
        response.setOffererName(conversation.getOfferer().getName());
        response.setOffererImageUrl(conversation.getOfferer().getImageUrl());
        response.setCreatedAt(conversation.getCreatedAt());
        return response;
    }

}

