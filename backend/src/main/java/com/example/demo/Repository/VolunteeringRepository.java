package com.example.demo.Repository;

import com.example.demo.Models.Volunteering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VolunteeringRepository extends JpaRepository<Volunteering, Long> {
    List<Volunteering> findByUserIdAndSeminarId(Long userId, Long seminarId);
}
