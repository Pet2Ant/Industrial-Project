package com.example.demo.Controllers;

import com.example.demo.Models.Hobbies;
import com.example.demo.Services.HobbiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/hobbies")
public class HobbiesController {
    private final HobbiesService hobbiesService;
    @Autowired
    public HobbiesController(HobbiesService hobbiesService) {
        this.hobbiesService = hobbiesService;
    }
    @PostMapping
    public ResponseEntity<Hobbies> createHobbies(@RequestBody Hobbies hobbies)
    {
        Hobbies savedHobbies = hobbiesService.saveHobbies(hobbies);
        return new ResponseEntity<>(savedHobbies, HttpStatus.CREATED);
    }
}
