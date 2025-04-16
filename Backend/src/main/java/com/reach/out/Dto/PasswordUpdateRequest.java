package com.reach.out.Dto;

import jakarta.validation.constraints.NotNull;

public class PasswordUpdateRequest {
    @NotNull(message = "currentPassword is required")
    private String currentPassword;

    @NotNull(message = "newPassword is required")
    private String newPassword;

    @NotNull(message = "newPasswordConfirm is required")
    private String newPasswordConfirm;

    public PasswordUpdateRequest(String newPassword, String currentPassword, String newPasswordConfirm) {
        this.newPassword = newPassword;
        this.currentPassword = currentPassword;
        this.newPasswordConfirm = newPasswordConfirm;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordConfirm() {
        return newPasswordConfirm;
    }

    public void setNewPasswordConfirm(String newPasswordConfirm) {
        this.newPasswordConfirm = newPasswordConfirm;
    }
}
