package com.reach.out.Repository;


import com.reach.out.Model.Help;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HelpRepository extends JpaRepository<Help, Long> {
    Optional<Help> getHelpById(Long id);
}
