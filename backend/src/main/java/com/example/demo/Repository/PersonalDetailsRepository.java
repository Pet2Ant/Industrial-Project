package com.example.demo.Repository;

import com.example.demo.Models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
   Optional<PersonalDetails> findByUserIdAndSeminarId(Long userId, Long seminarId);
}
