package com.example.demo.Services;
import com.example.demo.DTO.TechnicalSkillsDTO;
import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Repository.TechnicalSkillsRepository;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class TechnicalSkillsService {

        private final TechnicalSkillsRepository technicalSkillsRepository;

        @Autowired
        public TechnicalSkillsService(TechnicalSkillsRepository technicalSkillsRepository) {
            this.technicalSkillsRepository = technicalSkillsRepository;
        }

        public TechnicalSkills saveTechnicalSkills(TechnicalSkills technicalSkills) {
            return technicalSkillsRepository.save(technicalSkills);
        }
    public List<TechnicalSkillsDTO> getTechnicalSkillsById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<TechnicalSkills> technicalSkills = technicalSkillsRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<TechnicalSkillsDTO>>(){}.getType();
        return modelMapper.map(technicalSkills, listType);
    }
    @Transactional
    public void deleteAllTechnicalSkills(Long id, Long seminarId) {
        technicalSkillsRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }


}
