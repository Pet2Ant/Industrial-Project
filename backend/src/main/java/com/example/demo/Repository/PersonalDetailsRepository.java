package com.example.demo.Repository;

import com.example.demo.Models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
   Optional<PersonalDetails> findByUserIdAndSeminarId(Long userId, Long seminarId);

   void findAllByUserIdAndSeminarId(Long userId, Long seminarId);
   Optional<PersonalDetails> deletePersonalDetailsByIdAndSeminarId(Long id, Long seminarId);

   long countBySeminarId(Long seminarId);

}
