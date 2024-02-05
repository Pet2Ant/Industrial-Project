package com.example.demo.Services;

import com.example.demo.DTO.EducationDTO;
import com.example.demo.Models.Education;
import com.example.demo.Repository.EducationRepository;
import org.modelmapper.ModelMapper;
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
    public EducationDTO getEducationById(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Education education = educationRepository.findById(id).orElseThrow(() -> new RuntimeException("Education not found with id: " + id));
        return modelMapper.map(education, EducationDTO.class);

    }

}
