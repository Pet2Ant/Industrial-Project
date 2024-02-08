package com.example.demo.Services;

import com.example.demo.Models.Data;
import com.example.demo.Repository.DataRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    private final  DataRepository dataRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public DataService(DataRepository dataRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.dataRepository = dataRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<Data> getAllData() {
        return dataRepository.findAll();
    }


    public Data createData(Data data) {
        data.setPassword(bCryptPasswordEncoder.encode(data.getPassword()));
        data.setRole(data.getRole());
        return dataRepository.save(data);
    }

    public Data updateData(Long id, Data newData) {
        return dataRepository.findById(id)
                .map(data -> {
                    data.setUsername(newData.getUsername());
                    data.setEmail(newData.getEmail());
                    data.setPhone(newData.getPhone());
                    data.setPassword(newData.getPassword());
                    // Update the role of the user
                    data.setRole(newData.getRole());
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
