package com.reach.out.Services;

import com.reach.out.Dto.Conversation.ConversationSummaryResponse;
import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Dto.Conversation.SendMessageRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Mapper.ConversationMapper;
import com.reach.out.Mapper.MessageMapper;
import com.reach.out.Model.*;
import com.reach.out.Repository.*;
import com.reach.out.Security.AuthUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.reach.out.Dto.Conversation.MessageResponse;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements ConversationService{
    private final ConversationRepository conversationRepository;
    private final HelpRepository helpRepository;
    private final UserRepository userRepository;
    private final HelpOfferRepository helpOfferRepository;
    private final MessageRepository messageRepository;

    public ConversationServiceImpl(
            ConversationRepository conversationRepository,
            HelpRepository helpRepository,
            UserRepository userRepository,
            HelpOfferRepository helpOfferRepository,
            MessageRepository messageRepository
    ) {
        this.conversationRepository = conversationRepository;
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
        this.helpOfferRepository = helpOfferRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public Conversation createConversation(CreateConversationRequest request) {

        Optional<Conversation> existingConversation = conversationRepository
                .findByHelpIdAndHelpOfferId(request.getHelpId(), request.getHelpOfferId());
        if (existingConversation.isPresent()) {
            throw new ApiException("Conversation already exists for this Help and Help Offer");
        }

        Long userId = AuthUtils.getCurrentUserIdOrThrow();

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

    @Override
    public List<Conversation> getAllConversation() {
        return conversationRepository.findAll();
    }

    @Override
    @Transactional
    public MessageResponse createMessage(Long conversationId, SendMessageRequest request) {

        User currentUser = AuthUtils.getCurrentUserOrThrow(userRepository);

        // Fetch the conversation
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ApiException("Conversation not found"));

        // Check if current user is part of the conversation (requester or offerer)
        if (!conversation.getRequester().getId().equals(currentUser.getId()) &&
                !conversation.getOfferer().getId().equals(currentUser.getId())) {
            throw new ApiException("You are not allowed to send message in this conversation");
        }

        // Create new message
        Message message = new Message();
        message.setContent(request.getContent());
        message.setConversation(conversation);
        message.setSender(currentUser);

        Message savedMessage = messageRepository.save(message);

        return MessageMapper.toDto(savedMessage);

    }

    @Override
    public List<MessageResponse> getAllMessageById(Long conversationId) {
        User currentUser = AuthUtils.getCurrentUserOrThrow(userRepository);


        // Fetch the conversation
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ApiException("Conversation not found"));

        if (!conversation.getRequester().getId().equals(currentUser.getId()) &&
                !conversation.getOfferer().getId().equals(currentUser.getId())) {
            throw new ApiException("You are not allowed to send message in this conversation");
        }

        List<Message> messageList =messageRepository.findAllByConversationOrderBySentAtAsc(conversation);

        // Mapper to message response and send it

        return messageList.stream()
                .map(MessageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ConversationSummaryResponse> getAllConversationByMe() {
        Long userId = AuthUtils.getCurrentUserIdOrThrow();

        // Fetch user
        AuthUtils.getCurrentUserOrThrow(userRepository);


        // Fetch conversations where user is requester or offerer
        List<Conversation> conversationList = conversationRepository.findAllByUserId(userId);

        // Map each conversation to DTO and return
        return conversationList.stream()
                .map(ConversationMapper::mapToConversationSummary)
                .sorted(Comparator.comparing(ConversationSummaryResponse::getCreatedAt).reversed()) // Sort by latest first
                .collect(Collectors.toList());

    }


}
