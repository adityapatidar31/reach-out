package com.reach.out.Rest;

import com.reach.out.Services.MessageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/messages")
public class MessageController {
    private  final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }




}
