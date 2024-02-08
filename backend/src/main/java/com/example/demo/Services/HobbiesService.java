package com.example.demo.Services;

import com.example.demo.DTO.HobbiesDTO;
import com.example.demo.Models.Hobbies;
import com.example.demo.Repository.HobbiesRepository;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class HobbiesService {
    private final HobbiesRepository hobbiesRepository;

    @Autowired
    public HobbiesService(HobbiesRepository hobbiesRepository) {
        this.hobbiesRepository = hobbiesRepository;
    }

    public Hobbies saveHobbies(Hobbies hobbies) {
        hobbies.setStatus(0);
        return hobbiesRepository.save(hobbies);
    }
    public List<HobbiesDTO> getHobbiesById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Hobbies> hobbies = hobbiesRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<HobbiesDTO>>(){}.getType();
        return modelMapper.map(hobbies, listType);
    }
    public List<Hobbies> updateHobbies(long id ,long seminarId) {
        return hobbiesRepository.findByUserIdAndSeminarId(id, seminarId);
    }
    @Transactional
    public void deleteAllHobbies(Long id, Long seminarId) {
        hobbiesRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }


}
