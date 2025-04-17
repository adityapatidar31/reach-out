package com.reach.out.Rest;

import com.reach.out.Dto.Conversation.ConversationResponse;
import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Model.Conversation;
import com.reach.out.Services.ConversationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/v1/conversation")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping("")
    public ResponseEntity<Map<String ,Object>> getAllConversation(){
        Map<String,Object> response =new HashMap<>();
        List<Conversation> conversations=conversationService.getAllConversation();
        List<ConversationResponse> responses = conversations.stream()
                .map(convo -> new ConversationResponse(
                        convo.getId(),
                        convo.getHelp().getId(),
                        convo.getHelpOffer().getId(),
                        convo.getRequester().getId(),
                        convo.getOfferer().getId(),
                        convo.getCreatedAt()
                )).toList();
        response.put("status","success");
        response.put("data",responses);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String ,Object>> createConversation(
            @Valid @RequestBody CreateConversationRequest request
    ){
        Map<String,Object> response =new HashMap<>();
        Conversation conversation=conversationService.createConversation(request);
        response.put("status","success");
        response.put("data",conversation);
        return ResponseEntity.ok(response);
    }
}
