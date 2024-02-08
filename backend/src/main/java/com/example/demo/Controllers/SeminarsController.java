package com.example.demo.Controllers;

import com.example.demo.DTO.SeminarsDTO;
import com.example.demo.Models.Seminars;
import com.example.demo.Services.DataService;
import com.example.demo.Services.SeminarsService;
import com.example.demo.Util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seminars")
public class SeminarsController {
    private final SeminarsService seminarsService;

    private final DataService dataService;

    private final JwtUtil jwtUtil;

    public SeminarsController(SeminarsService seminarsService, DataService dataService, JwtUtil jwtUtil) {
        this.seminarsService = seminarsService;
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Seminars> createSeminars(@RequestBody Seminars seminars, @RequestHeader("Authorization") String token){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        long userId = dataService.getUserId(username).getId();
        seminars.setUserId(userId);
        Seminars savedSeminars = seminarsService.saveSeminars(seminars);
        return new ResponseEntity<>(savedSeminars, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/{seminarId}")
    public ResponseEntity<List<SeminarsDTO>> getSeminarsById(@PathVariable Long id, @PathVariable Long seminarId){
        List<SeminarsDTO> seminars = seminarsService.getSeminarsById(id,seminarId);
        return new ResponseEntity<>(seminars, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/delete")
    public ResponseEntity<Void> deleteSeminars(@RequestHeader("Authorization") String token, @RequestParam Long seminarId){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        seminarsService.deleteSeminars(userId,seminarId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
