package com.reach.out.Dto;

import com.reach.out.enums.HelpStatus;
import jakarta.validation.constraints.NotNull;

public class HelpPatchRequest {

    @NotNull(message = "status can be OPEN, FULFILLED or CANCELLED")
    private HelpStatus status;

    public HelpPatchRequest(){}

    public HelpStatus getStatus() {
        return status;
    }

    public void setStatus(HelpStatus status) {
        this.status = status;
    }

}
