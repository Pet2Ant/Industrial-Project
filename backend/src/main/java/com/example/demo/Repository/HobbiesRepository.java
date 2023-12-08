package com.example.demo.Repository;

import com.example.demo.Models.Hobbies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HobbiesRepository extends JpaRepository<Hobbies, Long> {
}
