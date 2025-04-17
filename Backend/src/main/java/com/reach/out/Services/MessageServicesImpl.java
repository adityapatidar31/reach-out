package com.reach.out.Services;

import com.reach.out.Repository.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageServicesImpl implements MessageService{

    private final MessageRepository messageRepository;

    public MessageServicesImpl(MessageRepository messageRepository){
        this.messageRepository=messageRepository;
    }

}
