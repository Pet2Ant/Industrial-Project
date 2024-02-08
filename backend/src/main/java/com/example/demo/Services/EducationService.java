package com.example.demo.Services;

import com.example.demo.DTO.*;
import com.example.demo.Models.Education;
import com.example.demo.Repository.EducationRepository;
import org.springframework.transaction.annotation.Transactional;;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List<EducationDTO> getEducationListById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Education> educationList = educationRepository.findAllByUserIdAndSeminarId(id,seminarId);
        List<EducationDTO> dtoList = new ArrayList<>();

        for (Education education : educationList) {
            EducationDTO dto;
            switch (education.getEducation()) {
                case "High School":
                    dto = new HighSchoolDTO();
                    modelMapper.map(education, dto);
                    dto.generateDTO();
                    break;
                case "Bachelor's Degree":
                    dto = new BachelorsDTO();
                    modelMapper.map(education, dto);
                    dto.generateDTO();
                    break;
                case "Master's Degree":
                    dto = new MastersDTO();
                    modelMapper.map(education, dto);
                    dto.generateDTO();
                    break;
                case "PhD":
                    dto = new PhDDTO();
                    modelMapper.map(education, dto);
                    dto.generateDTO();
                    break;
                default:
                    throw new IllegalArgumentException("Invalid education level: " + education.getEducation());
            }

            dtoList.add(dto);
        }

        return dtoList;
    }
    

    public Map<String, Map<String, Integer>> getEducationCountsPerSeminar() {

        List<Education> records = educationRepository.findAll();
        Map<String, Map<String, Integer>> result = new HashMap<>();


        for (Education record : records) {
            String seminarName = "Seminar" + record.getSeminarId();
            String educationLevel = record.getEducation();


            Map<String, Integer> educationCounts = result.computeIfAbsent(seminarName, k -> new HashMap<>());


            educationCounts.merge(educationLevel, 1, Integer::sum);
        }

        return result;
    }
    @Transactional
    public void deleteAllByUserIdAndSeminarId(Long id, Long seminarId) {
        educationRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }

}
