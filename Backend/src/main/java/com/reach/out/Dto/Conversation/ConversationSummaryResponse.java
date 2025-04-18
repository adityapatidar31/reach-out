package com.reach.out.Dto.Conversation;

import java.time.LocalDateTime;

public class ConversationSummaryResponse {
    private Long conversationId;
    private Long helpId;
    private String helpTitle;
    private String helpCreatorName;
    private String helpCreatorImageUrl;
    private Long helpOfferId;
    private String offererName;
    private String offererImageUrl;
    private LocalDateTime createdAt;

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOffererName() {
        return offererName;
    }

    public void setOffererName(String offererName) {
        this.offererName = offererName;
    }

    public String getOffererImageUrl() {
        return offererImageUrl;
    }

    public void setOffererImageUrl(String offererImageUrl) {
        this.offererImageUrl = offererImageUrl;
    }

    public Long getHelpOfferId() {
        return helpOfferId;
    }

    public void setHelpOfferId(Long helpOfferId) {
        this.helpOfferId = helpOfferId;
    }

    public String getHelpCreatorName() {
        return helpCreatorName;
    }

    public void setHelpCreatorName(String helpCreatorName) {
        this.helpCreatorName = helpCreatorName;
    }

    public String getHelpCreatorImageUrl() {
        return helpCreatorImageUrl;
    }

    public void setHelpCreatorImageUrl(String helpCreatorImageUrl) {
        this.helpCreatorImageUrl = helpCreatorImageUrl;
    }

    public String getHelpTitle() {
        return helpTitle;
    }

    public void setHelpTitle(String helpTitle) {
        this.helpTitle = helpTitle;
    }

    public Long getHelpId() {
        return helpId;
    }

    public void setHelpId(Long helpId) {
        this.helpId = helpId;
    }
}

