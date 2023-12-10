package com.example.demo.Controllers;

import com.example.demo.Models.Volunteering;
import com.example.demo.Services.VolunteeringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/volunteering")
public class VolunteeringController {
    private final VolunteeringService volunteeringService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public VolunteeringController(VolunteeringService volunteeringService) {
        this.volunteeringService = volunteeringService;
    }

    @PostMapping
    public ResponseEntity<Volunteering> createVolunteering(@RequestBody Volunteering volunteering, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        volunteering.setUserId(userId);
        Volunteering savedVolunteering = volunteeringService.saveVolunteering(volunteering);
        return new ResponseEntity<>(savedVolunteering, HttpStatus.CREATED);
    }
}
