package com.reach.out.Dto.Conversation;

import jakarta.validation.constraints.NotNull;

public class CreateConversationRequest {

    @NotNull(message = "Help Id is required")
    private Long helpId;

    @NotNull(message = "Help Id is required")
    private Long helpOfferId;

    @NotNull(message = "Help Id is required")
    private Long receiverId;

    public CreateConversationRequest() {}

    public CreateConversationRequest(Long helpId, Long helpOfferId, Long receiverId) {
        this.helpId = helpId;
        this.helpOfferId = helpOfferId;
        this.receiverId = receiverId;
    }

    // Getters and Setters

    public Long getHelpId() {
        return helpId;
    }

    public void setHelpId(Long helpId) {
        this.helpId = helpId;
    }

    public Long getHelpOfferId() {
        return helpOfferId;
    }

    public void setHelpOfferId(Long helpOfferId) {
        this.helpOfferId = helpOfferId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }
}

