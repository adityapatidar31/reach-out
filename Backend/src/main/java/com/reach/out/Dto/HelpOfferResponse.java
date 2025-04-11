package com.reach.out.Dto;


import com.reach.out.enums.HelpOfferStatus;
import java.time.LocalDateTime;

public class HelpOfferResponse {
    private Long id;
    private Long helpId;
    private Long userId;
    private String message;
    private HelpOfferStatus status;
    private LocalDateTime createdAt;

    // constructor
    public HelpOfferResponse(Long id, Long helpId, Long userId, String message, HelpOfferStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.helpId = helpId;
        this.userId = userId;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }

    public HelpOfferResponse(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public HelpOfferStatus getStatus() {
        return status;
    }

    public void setStatus(HelpOfferStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getHelpId() {
        return helpId;
    }

    public void setHelpId(Long helpId) {
        this.helpId = helpId;
    }
}