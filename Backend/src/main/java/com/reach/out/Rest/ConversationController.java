package com.reach.out.Rest;

import com.reach.out.Dto.Conversation.CreateConversationRequest;
import com.reach.out.Model.Conversation;
import com.reach.out.Services.ConversationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/conversation")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
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
