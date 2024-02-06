package com.example.demo.Repository;

import com.example.demo.Models.Work;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByUserIdAndSeminarId(Long userId, Long seminarId);
}
