package com.example.demo.Services;

import com.example.demo.DTO.HobbiesDTO;
import com.example.demo.Models.Hobbies;
import com.example.demo.Repository.HobbiesRepository;
import org.modelmapper.ModelMapper;
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
    public HobbiesDTO getHobbiesById(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Hobbies hobbies = hobbiesRepository.findById(id).orElseThrow(() -> new RuntimeException("Hobbies not found"));
        return modelMapper.map(hobbies, HobbiesDTO.class);
    }


}
