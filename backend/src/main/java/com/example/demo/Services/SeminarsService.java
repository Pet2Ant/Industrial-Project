package com.example.demo.Services;

import com.example.demo.Models.Seminars;
import com.example.demo.Repository.SeminarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeminarsService {
    private final SeminarsRepository seminarsRepository;

    @Autowired
    public SeminarsService(SeminarsRepository seminarsRepository) {
        this.seminarsRepository = seminarsRepository;
    }
    public Seminars saveSeminars(Seminars seminars) {
        return seminarsRepository.save(seminars);
    }

}
