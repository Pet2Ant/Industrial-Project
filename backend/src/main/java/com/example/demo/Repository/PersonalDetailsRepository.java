package com.example.demo.Repository;

import com.example.demo.Models.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {
   PersonalDetails findByUserIdAndSeminarId(Long userId, Long seminarId);

   List<PersonalDetails> findAllByUserIdAndSeminarId(Long userId, Long seminarId);
   void deleteAllByUserIdAndSeminarId(Long id, Long seminarId);
   @Query("SELECT pd.seminarId FROM PersonalDetails pd WHERE pd.userId = :userId")
   List<Long> findSeminarIdByUserId(long userId);

   long countBySeminarId(Long seminarId);

}
