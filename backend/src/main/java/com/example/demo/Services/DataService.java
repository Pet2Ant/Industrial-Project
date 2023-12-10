package com.example.demo.Services;

import com.example.demo.Models.Data;
import com.example.demo.Repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {
    @Autowired
    private final  DataRepository dataRepository;

    public DataService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<Data> getAllData() {
        return dataRepository.findAll();
    }


    public Data createData(Data data) {
        return dataRepository.save(data);
    }

    public Data updateData(Long id, Data newData) {
        return dataRepository.findById(id)
                .map(data -> {
                    data.setUsername(newData.getUsername());
                    data.setEmail(newData.getEmail());
                    data.setPhone(newData.getPhone());
                    data.setPassword(newData.getPassword());
                    return dataRepository.save(data);
                })
                .orElseGet(() -> {
                    newData.setId(id);
                    return dataRepository.save(newData);
                });
    }
    public Data getUserId(String username) {
        return dataRepository.findByUsername(username);
    }

    public void deleteData(Long id) {
        dataRepository.deleteById(id);
    }
}
