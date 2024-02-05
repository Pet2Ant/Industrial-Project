package com.example.demo.Services;

import com.example.demo.DTO.SeminarsDTO;
import com.example.demo.Models.Seminars;
import com.example.demo.Repository.SeminarsRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

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
    public List<SeminarsDTO> getSeminarsById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Seminars> seminars = seminarsRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<SeminarsDTO>>(){}.getType();
        return modelMapper.map(seminars, listType);
    }

}
