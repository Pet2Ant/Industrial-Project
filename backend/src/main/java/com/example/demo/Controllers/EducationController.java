package com.example.demo.Controllers;
import com.example.demo.Services.DataService;
import com.example.demo.Models.Education;
import com.example.demo.Services.EducationService;
import com.example.demo.Util.JwtUtil;
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
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }
    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education,@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        education.setUserId(userId);
        Education savedEducation = educationService.saveEducation(education);
        return new ResponseEntity<>(savedEducation, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id){
        Education education = educationService.getEducationById(id);
        return new ResponseEntity<>(education, HttpStatus.OK);
    }
}
