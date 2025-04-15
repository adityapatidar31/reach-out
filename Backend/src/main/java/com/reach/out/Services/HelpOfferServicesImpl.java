package com.reach.out.Services;

import com.reach.out.Dto.*;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Mapper.HelpMapper;
import com.reach.out.Model.Help;
import com.reach.out.Model.HelpOffer;
import com.reach.out.Model.User;
import com.reach.out.Repository.HelpOfferRepository;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import com.reach.out.Security.AuthUtils;
import com.reach.out.enums.HelpOfferStatus;
import com.reach.out.Mapper.HelpOfferMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HelpOfferServicesImpl implements HelpOfferServices {

    private final HelpOfferRepository helpOfferRepository;
    private final HelpRepository helpRepository;
    private final UserRepository userRepository;

    public HelpOfferServicesImpl(
            HelpOfferRepository helpOfferRepository,
            HelpRepository helpRepository,
            UserRepository userRepository
    ) {
        this.helpOfferRepository = helpOfferRepository;
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<HelpOfferResponse> getAllHelpOffer() {
        return helpOfferRepository.findAll()
                .stream()
                .map(HelpOfferMapper::toResponse)
                .toList();
    }

    @Override
    public HelpOfferResponse createHelpOfferRequest(HelpOfferRequest helpOfferRequest) {
        Help help = helpRepository.findById(helpOfferRequest.getHelpId())
                .orElseThrow(() -> new ApiException("Help request not found"));

        Long userId=AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please log in");


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

        HelpOffer helpOffer = new HelpOffer();
        helpOffer.setHelp(help);
        helpOffer.setOfferedBy(user);
        helpOffer.setMessage(helpOfferRequest.getMessage());
        helpOffer.setStatus(helpOfferRequest.getStatus() != null ? helpOfferRequest.getStatus() : HelpOfferStatus.PENDING);
        helpOffer.setCreatedAt(LocalDateTime.now());

        HelpOffer saved = helpOfferRepository.save(helpOffer);
        return HelpOfferMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public HelpOfferResponse updateHelpStatusById(Long id, HelpOfferStatusUpdateRequest helpOfferStatusUpdateRequest) {

        HelpOffer helpOffer = helpOfferRepository.findById(id)
                .orElseThrow(() -> new ApiException("Help offer not found"));

        Long userId=AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please log in");

        if(!helpOffer.getHelp().getId().equals(userId))
            throw new ApiException("You are not authorized to do it");

        helpOffer.setStatus(helpOfferStatusUpdateRequest.getStatus());
        helpOffer.setUpdatedAt(LocalDateTime.now());

        HelpOffer updated = helpOfferRepository.save(helpOffer);
        return HelpOfferMapper.toResponse(updated);
    }

    @Override
    public void deleteHelpOfferById(Long id) {
        HelpOffer helpOffer = helpOfferRepository.findById(id)
                .orElseThrow(() -> new ApiException("Help Offer Request is not found"));

        helpOfferRepository.delete(helpOffer);
    }

    @Override
    public List<HelpOfferResponseByUser> getAllHelpOfferByMe() {
        Long userId= AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please login first");

        return helpOfferRepository.findAllByOfferedById(userId)
                .stream()
                .map(helpOffer -> new HelpOfferResponseByUser(
                        helpOffer.getId(),
                        helpOffer.getHelp().getId(),
                        helpOffer.getOfferedBy().getId(),
                        helpOffer.getMessage(),
                        helpOffer.getStatus(),
                        helpOffer.getCreatedAt(),
                        HelpMapper.toHelpAllResponse(helpOffer.getHelp())
                ))
                .toList();
    }

    @Override
    public Optional<HelpOfferResponse> getOfferByHelpIdAndUserId(Long helpId) {

        Long userId=AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please Log in");

        return helpOfferRepository.findByHelp_IdAndOfferedBy_Id(helpId, userId)
                .map(HelpOfferMapper::toResponse);
    }

    @Override
    public List<HelpOfferResponseWithUser> getAllHelpOfferByHelpId(Long helpId) {

        Help help = helpRepository.getHelpById(helpId)
                .orElseThrow(()-> new ApiException("Please Provide the valid help id"));

        Long userId=AuthUtils.getCurrentUserId();
        if(userId==null)
            throw new ApiException("You are not authenticated. Please Log in.");

        if (!help.getCreatedBy().getId().equals(userId))
            throw new ApiException("You are not authorized to view offers for this help request.");

        List<HelpOffer> offers = helpOfferRepository.findAllByHelpId(helpId);
        return offers.stream()
                .map(HelpOfferMapper::toResponseWithUser)
                .toList();
    }

}
