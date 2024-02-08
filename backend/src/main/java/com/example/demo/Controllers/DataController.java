package com.example.demo.Controllers;

import com.example.demo.Models.Data;
import com.example.demo.Services.DataService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import com.example.demo.Util.JwtUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/data")
public class DataController {

    private final DataService dataService;

    private final JwtUtil jwtUtil;


    public DataController(DataService dataService, JwtUtil jwtUtil) {
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<Data> getAllData() {
        return dataService.getAllData();
    }


//    @PostMapping
////    @Valid
////    public ResponseEntity<?> createData(@RequestBody Data data) {
////        Data newData = dataService.createData(data);
////        System.out.println("New data: " + newData);
////        if (newData != null) {
////            // Generate a JWT for the user
////            String jwt = jwtUtil.generateToken(newData.getUsername());
////            System.out.println("Generated JWT: " + jwt);
////
////            // Return the JWT in the response
////            return ResponseEntity.ok().header("Authorization", "Bearer " + jwt).body(newData);
////        } else {
////            // Return an error message if the registration failed
////            return ResponseEntity.badRequest().body("Error: Registration failed!");
////        }
////    }
@PostMapping
@Valid
public ResponseEntity<?> createData(@RequestBody Data data) {
    Data newData = dataService.createData(data);
    if (newData != null) {
        String jwt = jwtUtil.generateToken(newData.getUsername(), newData.getRole());
        System.out.println("Generated JWT: " + jwt);
        return ResponseEntity.ok().header("Authorization", "Bearer " + jwt).body(newData);
    } else {

        return ResponseEntity.badRequest().body("Error: Registration failed!");
    }
}

    @PutMapping("/{id}")

    public Data updateData(@PathVariable Long id, @RequestBody Data data) {
        return dataService.updateData(id, data);
    }

    @DeleteMapping("/{id}")

    public void deleteData(@PathVariable Long id) {
        dataService.deleteData(id);
    }
}
