package com.reach.out.Dto;

import com.reach.out.enums.HelpOfferStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class HelpOfferRequest {

    @NotNull(message = "helpId is required")
    private Long helpId;

    private Long offeredBy;

    @NotBlank(message = "Message is required")
    private String message;

    private HelpOfferStatus status = HelpOfferStatus.PENDING;

    public HelpOfferRequest() {
    }

    public Long getHelpId() {
        return helpId;
    }

    public void setHelpId(Long helpId) {
        this.helpId = helpId;
    }

    public Long getOfferedBy() {
        return offeredBy;
    }

    public void setOfferedBy(Long offeredBy) {
        this.offeredBy = offeredBy;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HelpOfferStatus getStatus() {
        return status;
    }

    public void setStatus(HelpOfferStatus status) {
        this.status = status;
    }

}
