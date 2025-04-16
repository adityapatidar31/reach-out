package com.reach.out.Dto;

import jakarta.validation.constraints.NotNull;

public class UpdateUserNameRequest {

    @NotNull(message = "Name is required")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
