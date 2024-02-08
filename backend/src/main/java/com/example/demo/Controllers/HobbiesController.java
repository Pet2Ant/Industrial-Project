package com.example.demo.Controllers;

import com.example.demo.DTO.HobbiesDTO;
import com.example.demo.Models.Hobbies;
import com.example.demo.Services.HobbiesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/hobbies")
public class HobbiesController {
    private final HobbiesService hobbiesService;

    private final DataService dataService;

    private final JwtUtil jwtUtil;

    public HobbiesController(HobbiesService hobbiesService, DataService dataService, JwtUtil jwtUtil) {
        this.hobbiesService = hobbiesService;
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Hobbies> createHobbies(@RequestBody Hobbies hobbies, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        long userId = dataService.getUserId(username).getId();
        hobbies.setUserId(userId);
        Hobbies savedHobbies = hobbiesService.saveHobbies(hobbies);
        return new ResponseEntity<>(savedHobbies, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/{seminarId}")
    public ResponseEntity<List<HobbiesDTO>> getHobbiesById(@PathVariable Long id, @PathVariable Long seminarId){
        List<HobbiesDTO> hobbies = hobbiesService.getHobbiesById(id,seminarId);
        return new ResponseEntity<>(hobbies, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/delete")
    public ResponseEntity<Hobbies> deleteHobbiesById(@RequestHeader("Authorization") String token, @RequestParam Long seminarId){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        hobbiesService.deleteAllHobbies(userId,seminarId);
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public void updateHobbies(@RequestHeader("Authorization") String token, @RequestParam long seminarId){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        long userId = dataService.getUserId(username).getId();
        List<Hobbies> hobbies = hobbiesService.updateHobbies(userId,seminarId);
        for(Hobbies hobbies1 : hobbies){
            hobbies1.setStatus(1);
        }

    }
}

