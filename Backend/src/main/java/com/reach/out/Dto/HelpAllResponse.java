package com.reach.out.Dto;

import com.reach.out.enums.Category;
import com.reach.out.enums.HelpStatus;
import com.reach.out.enums.HelpType;

import java.time.LocalDateTime;
import java.util.List;

public class HelpAllResponse {
    private Long id;
    private String title;
    private String description;
    private String helpImageUrl;
    private String area;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private HelpType type;
    private HelpStatus status;
    private String reward;
    private List<Category> categories;
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(String reward) {
        this.reward = reward;
    }

    public HelpStatus getStatus() {
        return status;
    }

    public void setStatus(HelpStatus status) {
        this.status = status;
    }

    public HelpType getType() {
        return type;
    }

    public void setType(HelpType type) {
        this.type = type;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getHelpImageUrl() {
        return helpImageUrl;
    }

    public void setHelpImageUrl(String helpImageUrl) {
        this.helpImageUrl = helpImageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
