package com.reach.out.Dto;


import com.reach.out.enums.HelpOfferStatus;

import java.time.LocalDateTime;

public class HelpOfferResponseWithUser {
    private Long id;
    private Long helpId;
    private String message;
    private HelpOfferStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // User Details
    private Long userId;
    private String userName;
    private String userEmail;
    private String userImageUrl;

    public HelpOfferResponseWithUser(Long id, Long helpId, String message, HelpOfferStatus status,
                                     LocalDateTime createdAt, LocalDateTime updatedAt,
                                     Long userId, String userName, String userEmail, String userImageUrl) {
        this.id = id;
        this.helpId = helpId;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userImageUrl = userImageUrl;
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserImageUrl() {
        return userImageUrl;
    }

    public void setUserImageUrl(String userImageUrl) {
        this.userImageUrl = userImageUrl;
    }
}
