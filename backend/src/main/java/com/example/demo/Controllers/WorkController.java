package com.example.demo.Controllers;
import com.example.demo.DTO.WorkDTO;
import com.example.demo.Models.Work;
import com.example.demo.Services.WorkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/work")
public class WorkController {
    private final WorkService workService;

    private final  DataService dataService;

    private final JwtUtil jwtUtil;

    public WorkController(WorkService workService, DataService dataService, JwtUtil jwtUtil) {
        this.workService = workService;
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Work> createWork(@RequestBody Work work, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        long userId = dataService.getUserId(username).getId();
        work.setUserId(userId);

        Work savedWork = workService.saveWork(work);
        return new ResponseEntity<>(savedWork, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}/{seminarId}")
    public ResponseEntity<List<WorkDTO>> getWorkById(@PathVariable Long id, @PathVariable Long seminarId){
        List<WorkDTO> works = workService.getWorkById(id,seminarId);
        return new ResponseEntity<>(works, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteWork(@RequestHeader("Authorization") String token, @RequestParam Long seminarId){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        workService.deleteAllWork(userId,seminarId);
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
