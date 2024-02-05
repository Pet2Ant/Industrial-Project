package com.example.demo.Repository;

import com.example.demo.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUserIdAndApplicationId(Long userId, Long applicationId);
}
