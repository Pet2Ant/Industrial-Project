package com.example.demo.Services;

import com.example.demo.DTO.SeminarsDTO;
import com.example.demo.Models.Seminars;
import com.example.demo.Repository.SeminarsRepository;
import org.springframework.transaction.annotation.Transactional;
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
        seminars.setStatus(0);
        return seminarsRepository.save(seminars);
    }
    public List<Seminars> updateSeminars(long id ,long seminarId) {
        return seminarsRepository.findByUserIdAndSeminarId(id, seminarId);
    }
    public List<SeminarsDTO> getSeminarsById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Seminars> seminars = seminarsRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<SeminarsDTO>>(){}.getType();
        return modelMapper.map(seminars, listType);
    }
    public Seminars getSeminarByUserId(long id) {
        return  seminarsRepository.findById(id).orElseThrow(() -> new RuntimeException("Seminars not found"));
    }
    @Transactional
    public void deleteSeminars(Long id, Long seminarId) {
        seminarsRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }

}
