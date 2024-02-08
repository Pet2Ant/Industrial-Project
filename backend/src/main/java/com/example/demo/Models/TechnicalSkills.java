package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "technical_skills")
@Getter
@Setter
public class TechnicalSkills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "user_id",nullable = false)
    private long userId;

    @Column(name = "technical_skills", length = 2000) // Assuming skills can be quite long
    private String technicalSkills;

}
