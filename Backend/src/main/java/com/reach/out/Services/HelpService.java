package com.reach.out.Services;

import com.reach.out.Dto.HelpRequest;
import com.reach.out.Model.Help;

public interface HelpService {
    Help createHelp(HelpRequest helpRequest);
}
