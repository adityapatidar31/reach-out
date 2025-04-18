package com.reach.out.Repository;

import com.reach.out.Model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation,Long> {
    Optional<Conversation> findByHelpIdAndHelpOfferId(Long helpId, Long helpOfferId);

    @Query("SELECT c FROM Conversation c WHERE c.requester.id = :userId OR c.offerer.id = :userId ORDER BY c.createdAt DESC")
    List<Conversation> findAllByUserId(@Param("userId") Long userId);
}
