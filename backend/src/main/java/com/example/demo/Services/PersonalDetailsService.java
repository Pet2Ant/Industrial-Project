package com.example.demo.Services;

import com.example.demo.Models.PersonalDetails;
import com.example.demo.Repository.PersonalDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonalDetailsService {

    private final PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    public PersonalDetailsService(PersonalDetailsRepository personalDetailsRepository) {
        this.personalDetailsRepository = personalDetailsRepository;
    }

    public PersonalDetails savePersonalDetails(PersonalDetails personalDetails) {
        return personalDetailsRepository.save(personalDetails);
    }
}
