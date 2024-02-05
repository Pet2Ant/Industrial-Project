package com.example.demo.Controllers;

import com.example.demo.DTO.HobbiesDTO;
import com.example.demo.Models.Hobbies;
import com.example.demo.Services.HobbiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/hobbies")
public class HobbiesController {
    private final HobbiesService hobbiesService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public HobbiesController(HobbiesService hobbiesService) {
        this.hobbiesService = hobbiesService;
    }

    @PostMapping
    public ResponseEntity<Hobbies> createHobbies(@RequestBody Hobbies hobbies, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        hobbies.setUserId(userId);
        Hobbies savedHobbies = hobbiesService.saveHobbies(hobbies);
        return new ResponseEntity<>(savedHobbies, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<HobbiesDTO> getHobbiesById(@PathVariable Long id){
        HobbiesDTO hobbies = hobbiesService.getHobbiesById(id);
        return new ResponseEntity<>(hobbies, HttpStatus.OK);
    }
}

