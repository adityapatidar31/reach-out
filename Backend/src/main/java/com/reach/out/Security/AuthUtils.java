package com.reach.out.Security;
import com.reach.out.Exceptions.ApiException;
import com.reach.out.Model.User;
import com.reach.out.Repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtils {

    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Long) {
            return (Long) authentication.getPrincipal();
        }
        return null;
    }

    public static String getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !authentication.getAuthorities().isEmpty()) {
            return authentication.getAuthorities().iterator().next().getAuthority(); // returns "ROLE_USER" or "ROLE_ADMIN"
        }
        return null;
    }

    public static Long getCurrentUserIdOrThrow() {
        Long userId = getCurrentUserId();
        if (userId == null) {
            throw new ApiException("You are not authenticated. Please log in");
        }
        return userId;
    }

    public static User getCurrentUserOrThrow(UserRepository userRepository) {
        Long userId = getCurrentUserIdOrThrow();
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));
    }
}