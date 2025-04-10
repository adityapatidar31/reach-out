package com.reach.out.Model;

import com.reach.out.enums.HelpOfferStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class HelpOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "offered_by_id", nullable = false)
    private User offeredBy;

    @ManyToOne
    @JoinColumn(name = "help_id", nullable = false)
    private Help help;

    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HelpOfferStatus status;

    private LocalDateTime createdAt;

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    private LocalDateTime updatedAt;

    public HelpOffer() {
        this.createdAt = LocalDateTime.now();
        this.status = HelpOfferStatus.PENDING;
    }

    public HelpOffer(User offeredBy, Help help, String message, HelpOfferStatus status) {
        this.offeredBy = offeredBy;
        this.help = help;
        this.message = message;
        this.status = status != null ? status : HelpOfferStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public User getOfferedBy() {
        return offeredBy;
    }

    public void setOfferedBy(User offeredBy) {
        this.offeredBy = offeredBy;
    }

    public Help getHelp() {
        return help;
    }

    public void setHelp(Help help) {
        this.help = help;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

