package com.reach.out.Dto.Conversation;

import java.time.LocalDateTime;

public class MessageResponse {

    private Long id;
    private String content;
    private Long senderId;
    private String senderName;
    private LocalDateTime createdAt;

    public MessageResponse() {
    }

    public MessageResponse(Long id, String content, Long senderId, String senderName, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.senderName = senderName;
        this.createdAt = createdAt;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
