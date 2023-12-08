package com.example.demo.Services;

import com.example.demo.Models.Volunteering;
import com.example.demo.Repository.VolunteeringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VolunteeringService {
    private final VolunteeringRepository volunteeringRepository;

    @Autowired
    public VolunteeringService(VolunteeringRepository volunteeringRepository) {
        this.volunteeringRepository = volunteeringRepository;
    }

    public Volunteering saveVolunteering(Volunteering volunteering)
    {
        return volunteeringRepository.save(volunteering);
    }
}
