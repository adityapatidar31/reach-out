package com.reach.out.Services;

import com.reach.out.Dto.HelpOfferRequest;
import com.reach.out.Dto.HelpOfferStatusUpdateRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.Help;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Model.User;
import com.reach.out.Repository.HelpOfferRepository;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import com.reach.out.enums.HelpOfferStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HelpOfferServicesImpl implements HelpOfferServices{

    private final HelpOfferRepository helpOfferRepository;
    private final HelpRepository helpRepository;
    private final UserRepository userRepository;
    @Autowired
    public HelpOfferServicesImpl(
            HelpOfferRepository helpOfferRepository,
            HelpRepository helpRepository,
            UserRepository userRepository
    ){
        this.helpRepository=helpRepository;
        this.helpOfferRepository=helpOfferRepository;
        this.userRepository=userRepository;
    }

    @Override
    public List<HelpOffer> getAllHelpOffer() {
        return helpOfferRepository.findAll();
    }

    @Override
    public  HelpOffer createHelpOfferRequest(HelpOfferRequest helpOfferRequest){
        Help help = helpRepository.findById(helpOfferRequest.getHelpId())
                .orElseThrow(() -> new ApiException("Help request not found"));

        User user = userRepository.findById(helpOfferRequest.getOfferedBy())
                .orElseThrow(() -> new ApiException("User not found"));

        HelpOffer helpOffer = new HelpOffer();
        helpOffer.setHelp(help);
        helpOffer.setOfferedBy(user);
        helpOffer.setMessage(helpOfferRequest.getMessage());
        helpOffer.setStatus(helpOfferRequest.getStatus() != null ? helpOfferRequest.getStatus() : HelpOfferStatus.PENDING);

        return helpOfferRepository.save(helpOffer);
    }

    @Override
    public HelpOffer updateHelpStatusById(Long id, HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest) {
        HelpOffer helpOffer = helpOfferRepository.findById(id)
                .orElseThrow(() -> new ApiException("Help offer not found"));

        helpOffer.setStatus(helpOfferStatusUpdateRequest.getStatus());
        helpOffer.setUpdatedAt(LocalDateTime.now());

        return helpOfferRepository.save(helpOffer);
    }

    @Override
    public void deleteHelpOfferById(Long id){
        HelpOffer helpOffer=helpOfferRepository.findById(id).orElseThrow(()-> new ApiException("Help Offer Request is not found"));

        helpOfferRepository.delete(helpOffer);
    }

    @Override
    public List<HelpOffer> getAllHelpOfferByUserId(Long userId) {
        return helpOfferRepository.findAllByOfferedById(userId);
    }

}
