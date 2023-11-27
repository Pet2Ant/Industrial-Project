package com.example.demo.Controllers;

import com.example.demo.Models.Data;
import com.example.demo.Services.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping
    public List<Data> getAllData() {
        return dataService.getAllData();
    }

    @PostMapping
    public Data createData(@RequestBody Data data) {
        return dataService.createData(data);
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
