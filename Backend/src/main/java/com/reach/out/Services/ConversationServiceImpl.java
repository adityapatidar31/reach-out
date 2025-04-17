package com.reach.out.Services;

import com.reach.out.Repository.ConversationRepository;
import org.springframework.stereotype.Service;

@Service
public class ConversationServiceImpl implements ConversationService{
    private final ConversationRepository conversationRepository;

    public ConversationServiceImpl(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }
}
