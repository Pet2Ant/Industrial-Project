package com.example.demo.Controllers;

import com.example.demo.DTO.SeminarsDTO;
import com.example.demo.Models.Seminars;
import com.example.demo.Models.Work;
import com.example.demo.Services.DataService;
import com.example.demo.Services.SeminarsService;
import com.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seminars")
public class SeminarsController {
    private final SeminarsService seminarsService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public SeminarsController(SeminarsService seminarsService) {
        this.seminarsService = seminarsService;
    }
    @PostMapping
    public ResponseEntity<Seminars> createSeminars(@RequestBody Seminars seminars, @RequestHeader("Authorization") String token){
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        seminars.setUserId(userId);
        Seminars savedSeminars = seminarsService.saveSeminars(seminars);
        return new ResponseEntity<>(savedSeminars, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<SeminarsDTO> getSeminarsById(@PathVariable Long id){
        SeminarsDTO seminars = seminarsService.getSeminarsById(id);
        return new ResponseEntity<>(seminars, HttpStatus.OK);
    }

}
