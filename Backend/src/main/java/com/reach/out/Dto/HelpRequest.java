package com.reach.out.Dto;

import com.reach.out.enums.HelpType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class HelpRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Type (ASK or OFFER) is required")
    private HelpType type;

    @NotBlank(message = "Area is required")
    private String area;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotNull(message = "createdBy userId is required for now")
    private Long createdBy; // <-- Temporary, will be replaced with JWT logic later

    public HelpRequest() {
    }

    public HelpRequest(String title, String description, HelpType type, String area, String city, String state, String country, String pincode, Long createdBy) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.area = area;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.createdBy = createdBy;
    }

    // Getters & Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HelpType getType() {
        return type;
    }

    public void setType(HelpType type) {
        this.type = type;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}
