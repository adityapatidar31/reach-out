package com.reach.out.Services;

import com.reach.out.Model.HelpOffer;
import com.reach.out.Repository.HelpOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelpOfferServicesImpl implements HelpOfferServices{

    private final HelpOfferRepository helpOfferRepository;

    @Autowired
    public HelpOfferServicesImpl(HelpOfferRepository helpOfferRepository){
        this.helpOfferRepository=helpOfferRepository;
    }

    @Override
    public List<HelpOffer> getAllHelpOffer() {
        return helpOfferRepository.findAll();
    }
}
