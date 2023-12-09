package com.example.demo.Controllers;


import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Services.TechnicalSkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/TechnicalSkills")
public class TechnicalSkillsController{
    private final TechnicalSkillsService technicalSkillsService;

    @Autowired
    public TechnicalSkillsController(TechnicalSkillsService technicalSkillsService) {
        this.technicalSkillsService = technicalSkillsService;
    }
    @PostMapping
    public ResponseEntity<TechnicalSkills> createEducation(@RequestBody TechnicalSkills technicalSkills) {
        TechnicalSkills savedTechnicalSkills = technicalSkillsService.saveTechnicalSkills(technicalSkills);
        return new ResponseEntity<>(savedTechnicalSkills, HttpStatus.CREATED);
    }
}
