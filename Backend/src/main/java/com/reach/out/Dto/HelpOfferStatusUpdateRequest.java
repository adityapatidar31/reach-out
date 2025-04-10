package com.reach.out.Dto;

import com.reach.out.enums.HelpOfferStatus;
import jakarta.validation.constraints.NotNull;

public class HelpOfferStatusUpdateRequest {

    @NotNull(message = "Status is required and must be PENDING, ACCEPTED or DECLINED")
    private HelpOfferStatus status;

    public HelpOfferStatusUpdateRequest() {}

    public HelpOfferStatus getStatus() {
        return status;
    }

    public void setStatus(HelpOfferStatus status) {
        this.status = status;
    }
}
