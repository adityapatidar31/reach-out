package com.reach.out.Specification;
import com.reach.out.Model.Help;
import com.reach.out.enums.Category;
import com.reach.out.enums.HelpStatus;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Join;

public class HelpSpecification {

    public static Specification<Help> titleOrDescriptionContains(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) return null;
            String likePattern = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), likePattern),
                    cb.like(cb.lower(root.get("description")), likePattern)
            );
        };
    }

    public static Specification<Help> hasCategory(Category category) {
        return (root, query, cb) -> {
            if (category == null) return null;
            Join<Object, Object> join = root.join("categories");
            return cb.equal(join, category);
        };
    }

    public static Specification<Help> hasStatus(HelpStatus status) {
        return (root, query, cb) -> {
            if (status == null) return null;
            return cb.equal(root.get("status"), status);
        };
    }
}