package com.example.demo.Services;

import com.example.demo.DTO.EducationDTO;
import com.example.demo.Models.Education;
import com.example.demo.Repository.EducationRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
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

    public List<EducationDTO> getEducationListById(Long id,Long seminarId)
    {
        ModelMapper modelMapper = new ModelMapper();
        List<Education> education = educationRepository.findAllByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<EducationDTO>>(){}.getType();
        return modelMapper.map(education, listType);
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

}
