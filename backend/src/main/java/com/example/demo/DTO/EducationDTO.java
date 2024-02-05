package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EducationDTO {
    @JsonProperty("Education: ")
    private String education;

    @JsonProperty("School name: ")
    private String schoolName;

    @JsonProperty("School location: ")
    private String schoolLocation;

    @JsonProperty("Graduation year: ")
    private Integer graduationYear;

    @JsonProperty("University name: ")
    private String universityName;

    @JsonProperty("University location: ")
    private String universityLocation;

    @JsonProperty("Degree name: ")
    private String degreeName;

    @JsonProperty("Degree year: ")
    private Integer degreeYear;

    @JsonProperty("Thesis title: ")
    private String thesisTitle;

    @JsonProperty("Dissertation title: ")
    private String dissertationTitle;

}
