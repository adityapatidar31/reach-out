package com.reach.out.Services;

import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Model.Conversation;

import java.util.List;

public interface ConversationService {
    Conversation createConversation(CreateConversationRequest request);
    List<Conversation> getAllConversation();
}
