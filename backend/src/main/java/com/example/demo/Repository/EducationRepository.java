package com.example.demo.Repository;

import com.example.demo.Models.Data;
import com.example.demo.Models.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByUserIdAndSeminarId(Long userId, Long seminarId);

}
