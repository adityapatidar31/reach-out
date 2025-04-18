package com.reach.out.Repository;

import com.reach.out.Model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation,Long> {
    Optional<Conversation> findByHelpIdAndHelpOfferId(Long helpId, Long helpOfferId);
}
