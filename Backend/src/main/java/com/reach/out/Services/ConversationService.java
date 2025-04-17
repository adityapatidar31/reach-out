package com.reach.out.Services;

import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Model.Conversation;

public interface ConversationService {
    Conversation createConversation(CreateConversationRequest request);
}
