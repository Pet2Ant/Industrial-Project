package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HighSchoolDTO implements EducationDTO{
    @JsonProperty("Education")
    private String education;

    @JsonProperty("School name")
    private String schoolName;

    @JsonProperty("School location")
    private String schoolLocation;

    @JsonProperty("Graduation year")
    private Integer graduationYear;
    @Override
    public void generateDTO() {
        if (this.education == null || this.schoolName == null || this.schoolLocation == null || this.graduationYear == null) {
            throw new IllegalArgumentException("All fields must be provided for HighSchoolDTO");
        }
    }


    }

