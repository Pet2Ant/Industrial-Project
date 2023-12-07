package com.example.demo.Services;

import com.example.demo.Models.Education;
import com.example.demo.Repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    @Autowired
    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }
    public Education saveEducation(Education education) {
        return educationRepository.save(education);
    }
}
