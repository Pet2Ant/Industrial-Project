package com.example.demo.Repository;

import com.example.demo.Models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
   Optional<PersonalDetails> findByUserIdAndSeminarId(Long userId, Long seminarId);

   List<PersonalDetails> findAllByUserIdAndSeminarId(Long userId, Long seminarId);
   void deleteAllByUserIdAndSeminarId(Long id, Long seminarId);
   List<PersonalDetails> findByUserId(Long id);

   long countBySeminarId(Long seminarId);

}
