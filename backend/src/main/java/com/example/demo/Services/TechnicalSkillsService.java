package com.example.demo.Services;
import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Repository.TechnicalSkillsRepository;
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
        public TechnicalSkills getTechnicalSkillsById(Long id) {
            return technicalSkillsRepository.findById(id).orElseThrow(() -> new RuntimeException("Technical skills not found"));
        }


}
