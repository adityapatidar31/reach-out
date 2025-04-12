package com.reach.out.Dto;
import com.reach.out.enums.HelpOfferStatus;

import java.time.LocalDateTime;
public class HelpOfferResponseByUser {
    private Long id;
    private Long helpId;
    private Long offeredById;
    private String message;
    private HelpOfferStatus status;
    private LocalDateTime createdAt;

    private HelpAllResponse help;

    public HelpOfferResponseByUser(Long id, Long helpId, Long offeredById, String message, HelpOfferStatus status, LocalDateTime createdAt, HelpAllResponse help) {
        this.id = id;
        this.helpId = helpId;
        this.offeredById = offeredById;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
        this.help = help;
    }

    // Overloaded constructor for backward compatibility (optional)
    public HelpOfferResponseByUser(Long id, Long helpId, Long offeredById, String message, HelpOfferStatus status, LocalDateTime createdAt) {
        this(id, helpId, offeredById, message, status, createdAt, null);
    }

    // Getters and setters
    public HelpAllResponse getHelp() {
        return help;
    }

    public void setHelp(HelpAllResponse help) {
        this.help = help;
    }

    public HelpOfferResponseByUser(Long id, Long helpId, Long offeredById, HelpOfferStatus status, String message, LocalDateTime createdAt, HelpAllResponse help) {
        this.id = id;
        this.helpId = helpId;
        this.offeredById = offeredById;
        this.status = status;
        this.message = message;
        this.createdAt = createdAt;
        this.help = help;
    }
    public HelpOfferResponseByUser(){};

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

    public Long getOfferedById() {
        return offeredById;
    }

    public void setOfferedById(Long offeredById) {
        this.offeredById = offeredById;
    }

    public Long getHelpId() {
        return helpId;
    }

    public void setHelpId(Long helpId) {
        this.helpId = helpId;
    }
}
