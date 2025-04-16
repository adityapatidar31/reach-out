package com.reach.out.Services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.reach.out.Dto.HelpPatchRequest;
import com.reach.out.Dto.HelpRequest;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.Help;
import com.reach.out.Model.User;
import com.reach.out.Repository.HelpRepository;
import com.reach.out.Repository.UserRepository;
import com.reach.out.Security.AuthUtils;
import com.reach.out.Specification.HelpSpecification;
import com.reach.out.enums.Category;
import com.reach.out.enums.HelpStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class HelpServiceImpl implements HelpService {

    private final HelpRepository helpRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;

    public HelpServiceImpl(HelpRepository helpRepository, UserRepository userRepository, Cloudinary cloudinary) {
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public List<Help> getAllHelpRequest(){
        return helpRepository.findAll();
    }

    @Override
    public List<Help> getFilteredHelps(String search, Category category, HelpStatus status, String sortDir) {
        Specification<Help> spec = Specification
                .where(HelpSpecification.titleOrDescriptionContains(search))
                .and(HelpSpecification.hasCategory(category))
                .and(HelpSpecification.hasStatus(status));

        Sort sort = Sort.by("createdAt");
        sort = "asc".equalsIgnoreCase(sortDir) ? sort.ascending() : sort.descending();

        return helpRepository.findAll(spec, sort);
    }

    @Override
    public Help getHelpById(Long id) {
        return helpRepository.getHelpWithUserById(id)
                .orElseThrow(() -> new ApiException("Please Provide the valid Help Id"));
    }


    @Override
    public Help createHelp(HelpRequest helpRequest) {
        Long userId = AuthUtils.getCurrentUserId();
        if (userId == null)
            throw new ApiException("You are not authenticated. Please log in first.");
        User createdBy = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

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
        help.setCategories(helpRequest.getCategories());
        help.setReward(helpRequest.getReward());

        MultipartFile image = helpRequest.getHelpImage();

        try {
            // Upload to Cloudinary
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());

            // Extract URL from response
            String imageUrl = (String) uploadResult.get("secure_url");

            help.setHelpImageUrl(imageUrl);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to Cloudinary");
        }

        return helpRepository.save(help);
    }


    @Override
    @Transactional
    public void updateHelpStatusById(Long id, HelpPatchRequest patchRequest) {
        Help help = helpRepository.findById(id)
                .orElseThrow(() -> new ApiException("Help request not found"));

        Long userId = AuthUtils.getCurrentUserId();

        if(userId==null)
            throw new ApiException("You are not authenticated. Please log in first.");

        if (!help.getCreatedBy().getId().equals(userId)) {
            throw new ApiException("You are not authorized to update this help request");
        }

        help.setStatus(patchRequest.getStatus());
        helpRepository.save(help);
    }


    public void deleteHelpById(Long Id){
        // TODO: You need to delete the HelpOffered as well if you delete the Help
        helpRepository.deleteById(Id);
    }

    @Override
    public List<Help> getAllHelpRequestByMe() {
        Long userId=AuthUtils.getCurrentUserId();
        return helpRepository.findAllByCreatedById(userId);
    }

}
