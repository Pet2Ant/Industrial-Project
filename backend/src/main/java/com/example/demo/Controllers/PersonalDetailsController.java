package com.example.demo.Controllers;

import com.example.demo.DTO.PersonalDetailsDTO;
import com.example.demo.Models.PersonalDetails;
import com.example.demo.Services.PersonalDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/personalDetails")
public class PersonalDetailsController {
    private final PersonalDetailsService personalDetailsService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public PersonalDetailsController(PersonalDetailsService personalDetailsService) {
        this.personalDetailsService = personalDetailsService;
    }

    @PostMapping
    public ResponseEntity<PersonalDetails> createPersonalDetails(@RequestBody PersonalDetails personalDetails, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        personalDetails.setUserId(userId);
        PersonalDetails savedPersonalDetails = personalDetailsService.savePersonalDetails(personalDetails);
        return new ResponseEntity<>(savedPersonalDetails, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<PersonalDetails>> getPersonalDetails(){
        List<PersonalDetails> personalDetails = personalDetailsService.getPersonalDetails();
        return new ResponseEntity<>(personalDetails, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PersonalDetailsDTO> getPersonalDetailsById(@PathVariable Long id){
        PersonalDetailsDTO personalDetails = personalDetailsService.getPersonalDetailsById(id);
        return new ResponseEntity<>(personalDetails, HttpStatus.OK);
    }
}
