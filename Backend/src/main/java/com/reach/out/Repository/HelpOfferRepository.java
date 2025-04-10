package com.reach.out.Repository;

import com.reach.out.Model.HelpOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpOfferRepository extends JpaRepository<HelpOffer,Long> {
}
