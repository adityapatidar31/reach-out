package com.reach.out.Services;

import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.Model.User;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import com.reach.out.enums.HelpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        List<Help> helps=helpRepository.findAll();

        return helps;
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
}
