package com.example.demo.Services;
import com.example.demo.DTO.TechnicalSkillsDTO;
import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Repository.TechnicalSkillsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        public TechnicalSkillsDTO getTechnicalSkillsById(Long id) {
            ModelMapper modelMapper = new ModelMapper();
            TechnicalSkills technicalSkills = technicalSkillsRepository.findById(id).orElseThrow(() -> new RuntimeException("Technical skills not found"));
            return modelMapper.map(technicalSkills, TechnicalSkillsDTO.class);
        }


}
