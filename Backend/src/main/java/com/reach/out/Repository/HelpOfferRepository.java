package com.reach.out.Repository;

import com.reach.out.Model.HelpOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpOfferRepository extends JpaRepository<HelpOffer,Long> {
    @Query("SELECT h FROM HelpOffer h WHERE h.offeredBy.id = :userId")
    List<HelpOffer> findAllByOfferedById(@Param("userId") Long userId);
}
