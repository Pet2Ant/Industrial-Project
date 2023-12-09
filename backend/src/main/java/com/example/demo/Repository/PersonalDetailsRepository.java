package com.example.demo.Repository;

import com.example.demo.Models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
}
