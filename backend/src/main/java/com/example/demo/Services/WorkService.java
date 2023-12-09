package com.example.demo.Services;

import com.example.demo.Models.Work;
import com.example.demo.Repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
