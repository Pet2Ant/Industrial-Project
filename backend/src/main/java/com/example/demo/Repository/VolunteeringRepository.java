package com.example.demo.Repository;

import com.example.demo.Models.Volunteering;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteeringRepository extends JpaRepository<Volunteering, Long> {
}
