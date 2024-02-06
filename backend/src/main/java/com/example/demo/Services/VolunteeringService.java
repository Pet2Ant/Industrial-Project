package com.example.demo.Services;

import com.example.demo.DTO.VolunteeringDTO;
import com.example.demo.Models.Volunteering;
import com.example.demo.Repository.VolunteeringRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

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
    //get volunteering by id
    public List<VolunteeringDTO> getVolunteeringById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Volunteering> volunteerings = volunteeringRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<VolunteeringDTO>>(){}.getType();
        return modelMapper.map(volunteerings, listType);
    }


}
