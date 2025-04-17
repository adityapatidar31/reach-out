package com.reach.out.Dto.Conversation;

import java.time.LocalDateTime;

public class ConversationResponse {
    private Long id;
    private Long helpId;
    private Long helpOfferId;
    private Long requesterId;
    private Long offererId;
    private LocalDateTime createdAt;

    public ConversationResponse(Long id, Long helpId, Long helpOfferId, Long requesterId, Long offererId, LocalDateTime createdAt) {
        this.id = id;
        this.helpId = helpId;
        this.helpOfferId = helpOfferId;
        this.requesterId = requesterId;
        this.offererId = offererId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public Long getOffererId() {
        return offererId;
    }

    public void setOffererId(Long offererId) {
        this.offererId = offererId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

