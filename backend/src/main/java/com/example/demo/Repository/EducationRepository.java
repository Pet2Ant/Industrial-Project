package com.example.demo.Repository;

import com.example.demo.Models.Data;
import com.example.demo.Models.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Long> {
}
