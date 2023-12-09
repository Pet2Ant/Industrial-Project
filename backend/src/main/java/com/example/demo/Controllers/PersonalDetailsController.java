package com.example.demo.Controllers;

import com.example.demo.Models.PersonalDetails;
import com.example.demo.Services.PersonalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/PersonalDetails")
public class PersonalDetailsController{
    private final PersonalDetailsService  personalDetailsService;

    @Autowired
    public PersonalDetailsController(PersonalDetailsService personalDetailsService) {
        this.personalDetailsService = personalDetailsService;
    }
    @PostMapping
    public ResponseEntity<PersonalDetails> createEducation(@RequestBody PersonalDetails personalDetails) {
        PersonalDetails savedPersonalDetails = personalDetailsService.savePersonalDetails(personalDetails);
        return new ResponseEntity<>(savedPersonalDetails, HttpStatus.CREATED);
    }
}
