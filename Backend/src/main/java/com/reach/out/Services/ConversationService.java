package com.reach.out.Services;

import com.reach.out.Dto.Conversation.ConversationSummaryResponse;
import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Dto.Conversation.MessageResponse;
import com.reach.out.Dto.Conversation.SendMessageRequest;
import com.reach.out.Model.Conversation;

import java.util.List;

public interface ConversationService {
    Conversation createConversation(CreateConversationRequest request);
    List<Conversation> getAllConversation();
    MessageResponse createMessage(Long conversationId, SendMessageRequest request);
    List<MessageResponse> getAllMessageById(Long conversationId);
    List<ConversationSummaryResponse> getAllConversationByMe();
}
