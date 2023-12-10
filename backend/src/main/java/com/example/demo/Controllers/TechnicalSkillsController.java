package com.example.demo.Controllers;


import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Services.TechnicalSkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/technicalSkills")
public class TechnicalSkillsController {
    private final TechnicalSkillsService technicalSkillsService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public TechnicalSkillsController(TechnicalSkillsService technicalSkillsService) {
        this.technicalSkillsService = technicalSkillsService;
    }

    @PostMapping
    public ResponseEntity<TechnicalSkills> createTechnicalSkills(@RequestBody TechnicalSkills technicalSkills, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        technicalSkills.setUserId(userId);
        TechnicalSkills savedTechnicalSkills = technicalSkillsService.saveTechnicalSkills(technicalSkills);
        return new ResponseEntity<>(savedTechnicalSkills, HttpStatus.CREATED);
    }
}

