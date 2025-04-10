package com.reach.out.Services;

import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.Help;
import com.reach.out.Model.User;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelpServiceImpl implements HelpService {

    private final HelpRepository helpRepository;
    private final UserRepository userRepository;

    public HelpServiceImpl(HelpRepository helpRepository, UserRepository userRepository) {
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Help> getAllHelpRequest(){
        return helpRepository.findAll();
    }

    @Override
    public Help getHelpById(Long Id){
        return helpRepository.getHelpById(Id).orElseThrow(()-> new ApiException("Please Provide the valid Help Id"));
    }

    @Override
    public Help createHelp(HelpRequest helpRequest) {
        User createdBy = userRepository.findById(helpRequest.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + helpRequest.getCreatedBy()));

        Help help = new Help();
        help.setTitle(helpRequest.getTitle());
        help.setDescription(helpRequest.getDescription());
        help.setType(helpRequest.getType());
        help.setArea(helpRequest.getArea());
        help.setCity(helpRequest.getCity());
        help.setState(helpRequest.getState());
        help.setCountry(helpRequest.getCountry());
        help.setPincode(helpRequest.getPincode());
        help.setCreatedBy(createdBy);

        return helpRepository.save(help);
    }

    @Override
    public Help updateHelpStatusById(Long id, HelpPatchRequest patchRequest) {
        Help help = helpRepository.findById(id).orElseThrow(()->new ApiException("Help request not found"));

        help.setStatus(patchRequest.getStatus());

        return helpRepository.save(help);
    }

    public void deleteHelpById(Long Id){
        helpRepository.deleteById(Id);
    }

    @Override
    public List<Help> getAllHelpRequestByUserId(Long userId) {
        return helpRepository.findAllByCreatedById(userId);
    }

}
