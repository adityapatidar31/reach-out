package com.reach.out.Mapper;

import com.reach.out.Dto.Conversation.MessageResponse;
import com.reach.out.Model.Message;

public class MessageMapper {
    public static MessageResponse toDto(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getContent(),
                message.getSender().getId(),
                message.getSender().getName(),
                message.getSentAt()
        );
    }
}
