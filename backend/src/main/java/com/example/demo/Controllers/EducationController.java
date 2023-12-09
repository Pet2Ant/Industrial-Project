package com.example.demo.Controllers;

import com.example.demo.Models.Education;
import com.example.demo.Services.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/education")
public class EducationController {
    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }
    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education savedEducation = educationService.saveEducation(education);
        return new ResponseEntity<>(savedEducation, HttpStatus.CREATED);
    }
}
