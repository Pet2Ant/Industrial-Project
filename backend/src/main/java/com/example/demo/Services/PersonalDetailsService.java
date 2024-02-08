package com.example.demo.Services;

import com.example.demo.DTO.PersonalDetailsDTO;
import com.example.demo.Models.PersonalDetails;
import com.example.demo.Repository.PersonalDetailsRepository;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PersonalDetailsService {

    private final PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    public PersonalDetailsService(PersonalDetailsRepository personalDetailsRepository) {
        this.personalDetailsRepository = personalDetailsRepository;
    }

    public PersonalDetails savePersonalDetails(PersonalDetails personalDetails) {
        personalDetails.setStatus(0);
        return personalDetailsRepository.save(personalDetails);
    }
    public long getPersonalDetailsByUserId(long id) {
        Optional<PersonalDetails> personalDetails = personalDetailsRepository.findById(id);
        List<Long> ids = personalDetailsRepository.findSeminarIdByUserId(id);
        return ids.get(0);
    }
    public PersonalDetails updatePersonalDetails(PersonalDetails personalDetails) {
        personalDetails.setStatus(1);
        return personalDetailsRepository.save(personalDetails);
    }
    public PersonalDetails givePersonalDetails(long id , long seminarId) {
        return personalDetailsRepository.findByUserIdAndSeminarId(id, seminarId);
    }
    public List<PersonalDetails> getPersonalDetails(){
        return personalDetailsRepository.findAll();
    }
    public PersonalDetailsDTO getPersonalDetailsById(Long id, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        PersonalDetails personalDetails = personalDetailsRepository.findByUserIdAndSeminarId(id,seminarId);
        return modelMapper.map(personalDetails, PersonalDetailsDTO.class);
    }
    public List<PersonalDetailsDTO> getPersonalDetailsListById(Long id, Long seminarId)
    {
        ModelMapper modelMapper = new ModelMapper();
        List<PersonalDetails> personalDetails = personalDetailsRepository.findAllByUserIdAndSeminarId(id,seminarId);
        Type listType = new TypeToken<List<PersonalDetailsDTO>>(){}.getType();
        return modelMapper.map(personalDetails, listType);
    }
    public Map<Integer, Long> getSeminarCounts() {
        Map<Integer, Long> seminarCounts = new HashMap<>();
        for (int i = 1; i <= 6; i++) {
            seminarCounts.put(i, personalDetailsRepository.countBySeminarId((long)i));
        }
        return seminarCounts;
    }
    @Transactional
    public void deletePersonalDetails(Long id, Long seminarId) {
        personalDetailsRepository.deleteAllByUserIdAndSeminarId(id, seminarId);
    }
    public List<Long> getSeminarIdByUserId(long id) {
        return personalDetailsRepository.findSeminarIdByUserId(id);
    }




}
