package com.reach.out.Services;

import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;

import java.util.List;

public interface HelpService {
    Help createHelp(HelpRequest helpRequest);
    List<Help> getAllHelpRequest();
    Help getHelpById(Long Id);
    void deleteHelpById(Long Id);
}
