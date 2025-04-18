package com.reach.out.Repository;

import com.reach.out.Model.Conversation;
import com.reach.out.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByConversationOrderBySentAtAsc(Conversation conversation);
}
