package com.example.demo.Services;

import com.example.demo.DTO.WorkDTO;

import com.example.demo.Models.Work;
import com.example.demo.Repository.WorkRepository;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class WorkService {
    private final WorkRepository workRepository;

    @Autowired
    public WorkService(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    public Work saveWork(Work work) {
        return workRepository.save(work);
    }
    public List<WorkDTO> getWorkById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Work> works = workRepository.findByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<WorkDTO>>(){}.getType();
        return modelMapper.map(works, listType);
    }
    @Transactional
    public void deleteAllWork(Long id, Long seminarId) {
        workRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }


}
