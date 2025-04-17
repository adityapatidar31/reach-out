package com.reach.out.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "help_id", nullable = false)
    private Help help;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "help_offer_id", nullable = false)
    private HelpOffer helpOffer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;  // Help creator

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offerer_id", nullable = false)
    private User offerer;    // HelpOffer creator

    private LocalDateTime createdAt;

    public Conversation() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Help getHelp() {
        return help;
    }

    public void setHelp(Help help) {
        this.help = help;
    }

    public HelpOffer getHelpOffer() {
        return helpOffer;
    }

    public void setHelpOffer(HelpOffer helpOffer) {
        this.helpOffer = helpOffer;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getOfferer() {
        return offerer;
    }

    public void setOfferer(User offerer) {
        this.offerer = offerer;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
