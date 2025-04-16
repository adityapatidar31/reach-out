package com.reach.out.Dto;

import com.reach.out.enums.Category;
import com.reach.out.enums.HelpType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    private Long createdBy;

    @NotNull(message = "Help image is required")
    private MultipartFile helpImage;

    @NotBlank(message = "Reward is required")
    private String reward;

    @NotNull(message = "At least one category is required")
    private List<Category> categories;

    public HelpRequest() {
    }

    public HelpRequest(String title, String description, HelpType type, String area, String city, String state,
                       String country, String pincode, Long createdBy, MultipartFile helpImage,
                       String reward, List<Category> categories) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.area = area;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.createdBy = createdBy;
        this.helpImage = helpImage;
        this.reward = reward;
        this.categories = categories;
    }

    // Getters and setters

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

    public MultipartFile getHelpImage() {
        return helpImage;
    }

    public void setHelpImage(MultipartFile helpImage) {
        this.helpImage = helpImage;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
