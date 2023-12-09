package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "education")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name ="user_id")
    private Long userId;

    @Column(name = "education_level")
    private String educationLevel;

    @Column(name = "school_name")
    private String schoolName;

    @Column(name = "school_location")
    private String schoolLocation;

    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(name = "university_name")
    private String universityName;

    @Column(name = "university_location")
    private String universityLocation;

    @Column(name = "degree_name")
    private String degreeName;

    @Column(name = "degree_year")
    private Integer degreeYear;

    @Column(name = "thesis_title")
    private String thesisTitle;

    @Column(name = "dissertation_title")
    private String dissertationTitle;

}
