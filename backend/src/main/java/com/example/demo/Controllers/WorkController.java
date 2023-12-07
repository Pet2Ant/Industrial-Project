package com.example.demo.Controllers;

import com.example.demo.Models.Work;
import com.example.demo.Services.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Work")
public class WorkController {
    private final WorkService workService;
    @Autowired
    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    public ResponseEntity<Work> createEducation(@RequestBody Work work) {
        Work savedWork = workService.saveWork(work);
        return new ResponseEntity<>(savedWork, HttpStatus.CREATED);
    }

}
