package com.reach.out.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.reach.out.enums.Category;
import com.reach.out.enums.HelpStatus;
import com.reach.out.enums.HelpType;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Help {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000, nullable = false)
    private String description;


    @Column(name = "help_image_url", nullable = false)
    private String helpImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HelpType type; // ASK or OFFER

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String pincode;

    @Enumerated(EnumType.STRING)
    private HelpStatus status = HelpStatus.OPEN;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String reward;

    @ElementCollection(targetClass = Category.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "help_categories", joinColumns = @JoinColumn(name = "help_id"))
    @Column(name = "category", nullable = false)
    private List<Category> categories;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User createdBy;

    public Help(User createdBy, HelpStatus status, String pincode, String country, String state, String city, String reward,
                 String area, HelpType type, String title, String description, String helpImageUrl, List<Category> categories
    ) {
        this.createdBy = createdBy;
        this.status = status;
        this.pincode = pincode;
        this.country = country;
        this.state = state;
        this.city = city;
        this.area = area;
        this.type = type;
        this.title = title;
        this.description = description;
        this.helpImageUrl = helpImageUrl;
        this.categories=categories;
        this.reward=reward;
    }

    public Help(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
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

    public String getHelpImageUrl() {
        return helpImageUrl;
    }

    public void setHelpImageUrl(String helpImageUrl) {
        this.helpImageUrl = helpImageUrl;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public HelpStatus getStatus() {
        return status;
    }

    public void setStatus(HelpStatus status) {
        this.status = status;
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

    public HelpType getType() {
        return type;
    }

    public void setType(HelpType type) {
        this.type = type;
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
