package com.reach.out.Repository;


import com.reach.out.Model.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HelpRepository extends JpaRepository<Help, Long> {
    Optional<Help> getHelpById(Long id);

    @Query("SELECT h FROM Help h WHERE h.createdBy.id = :userId")
    List<Help> findAllByCreatedById(@Param("userId") Long userId);
}
