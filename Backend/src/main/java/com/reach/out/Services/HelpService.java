package com.reach.out.Services;

import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;
import com.reach.out.enums.Category;
import com.reach.out.enums.HelpStatus;

import java.util.List;

public interface HelpService {
    List<Help> getAllHelpRequest();
    List<Help> getFilteredHelps(String search, Category category, HelpStatus status, String sortDir);
    Help getHelpById(Long Id);
    Help createHelp(HelpRequest helpRequest);
    void updateHelpStatusById(Long id, HelpPatchRequest patchRequest);
    void deleteHelpById(Long Id);
    List<Help> getAllHelpRequestByMe();

}
