package com.example.demo.Repository;
import com.example.demo.Models.PersonalDetails;
import com.example.demo.Models.Seminars;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeminarsRepository  extends  JpaRepository<Seminars, Long>{
    List<Seminars> findByUserIdAndSeminarId(Long userId, Long seminarId);
    void deleteAllByUserIdAndSeminarId(Long userId, Long seminarId);
    List<Seminars> findAllByStatus(long applicationStatus);
}
