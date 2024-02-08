package com.example.demo.Controllers;


import com.example.demo.DTO.TechnicalSkillsDTO;
import com.example.demo.Models.TechnicalSkills;
import com.example.demo.Services.TechnicalSkillsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/technicalSkills")
public class TechnicalSkillsController {
    private final TechnicalSkillsService technicalSkillsService;

    private final DataService dataService;

    private final JwtUtil jwtUtil;

    public TechnicalSkillsController(TechnicalSkillsService technicalSkillsService, DataService dataService, JwtUtil jwtUtil) {
        this.technicalSkillsService = technicalSkillsService;
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<TechnicalSkills> createTechnicalSkills(@RequestBody TechnicalSkills technicalSkills, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        long userId = dataService.getUserId(username).getId();
        technicalSkills.setUserId(userId);
        TechnicalSkills savedTechnicalSkills = technicalSkillsService.saveTechnicalSkills(technicalSkills);
        return new ResponseEntity<>(savedTechnicalSkills, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/{seminarId}")
    public ResponseEntity<List<TechnicalSkillsDTO>> getTechnicalSkillsById(@PathVariable Long id, @PathVariable Long seminarId){
        List<TechnicalSkillsDTO> technicalSkills = technicalSkillsService.getTechnicalSkillsById(id,seminarId);
        return new ResponseEntity<>(technicalSkills, HttpStatus.OK);
    }
}

