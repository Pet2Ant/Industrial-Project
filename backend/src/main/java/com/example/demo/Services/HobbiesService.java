package com.example.demo.Services;

import com.example.demo.Models.Hobbies;
import com.example.demo.Repository.HobbiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HobbiesService {
    private final HobbiesRepository hobbiesRepository;

    @Autowired
    public HobbiesService(HobbiesRepository hobbiesRepository) {
        this.hobbiesRepository = hobbiesRepository;
    }

    public Hobbies saveHobbies(Hobbies hobbies) {
        return hobbiesRepository.save(hobbies);
    }


}
