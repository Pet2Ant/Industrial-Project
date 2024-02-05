package com.example.demo.Repository;

import com.example.demo.Models.Hobbies;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HobbiesRepository extends JpaRepository<Hobbies, Long> {
    List<Hobbies> findByUserIdAndSeminarId(Long userId, Long seminarId);
}
