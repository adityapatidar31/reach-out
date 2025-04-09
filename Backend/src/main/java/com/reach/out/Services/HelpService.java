package com.reach.out.Services;

import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;

import java.util.List;

public interface HelpService {
    Help getHelpById(Long Id);
    List<Help> getAllHelpRequest();
    Help createHelp(HelpRequest helpRequest);
    Help updateHelpStatusById(Long id, HelpPatchRequest patchRequest);
    void deleteHelpById(Long Id);
}
