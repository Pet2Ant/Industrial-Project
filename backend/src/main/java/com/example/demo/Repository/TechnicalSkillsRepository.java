package com.example.demo.Repository;

import com.example.demo.Models.TechnicalSkills;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TechnicalSkillsRepository extends JpaRepository<TechnicalSkills, Long> {
    List<TechnicalSkills> findByUserIdAndSeminarId(Long userId, Long seminarId);
    void deleteAllByUserIdAndSeminarId(Long userId, Long seminarId);
}
