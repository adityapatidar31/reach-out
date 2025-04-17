package com.reach.out.Services;

import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Dto.HelpOfferResponse;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.Conversation;
import com.reach.out.Model.Help;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Model.User;
import com.reach.out.Repository.ConversationRepository;
import com.reach.out.Repository.HelpOfferRepository;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import com.reach.out.Security.AuthUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ConversationServiceImpl implements ConversationService{
    private final ConversationRepository conversationRepository;
    private final HelpRepository helpRepository;
    private final UserRepository userRepository;
    private final HelpOfferRepository helpOfferRepository;

    public ConversationServiceImpl(
            ConversationRepository conversationRepository,
            HelpRepository helpRepository,
            UserRepository userRepository,
            HelpOfferRepository helpOfferRepository
    ) {
        this.conversationRepository = conversationRepository;
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
        this.helpOfferRepository = helpOfferRepository;
    }

    @Override
    public Conversation createConversation(CreateConversationRequest request) {
        Long userId= AuthUtils.getCurrentUserId();
        if (userId == null) {
            throw new ApiException("You are not authenticated. Please log in");
        }

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("Receiver not found"));

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ApiException("Receiver not found"));

        Help help = helpRepository.findById(request.getHelpId())
                .orElseThrow(() -> new ApiException("Help not found"));

        HelpOffer helpOffer = helpOfferRepository.findById(request.getHelpOfferId())
                .orElseThrow(() -> new ApiException("HelpOffer not found"));

        Conversation conversation = new Conversation();
        conversation.setHelp(help);
        conversation.setHelpOffer(helpOffer);
        conversation.setRequester(currentUser); // sender
        conversation.setOfferer(receiver);       // receiver
        return conversationRepository.save(conversation);
    }
}
