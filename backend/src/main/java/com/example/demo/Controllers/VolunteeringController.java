package com.example.demo.Controllers;

import com.example.demo.Models.Volunteering;
import com.example.demo.Services.VolunteeringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/volunteering")
public class VolunteeringController {
    private final VolunteeringService volunteeringService;

    @Autowired
    public VolunteeringController(VolunteeringService volunteeringService) {
        this.volunteeringService = volunteeringService;
    }

    public ResponseEntity<Volunteering> createVolunteering(Volunteering volunteering) {
        Volunteering savedVolunteering = volunteeringService.saveVolunteering(volunteering);
        return ResponseEntity.ok(savedVolunteering);
    }
}
