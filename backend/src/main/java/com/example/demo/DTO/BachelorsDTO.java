package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BachelorsDTO implements EducationDTO {
    @JsonProperty("Education")
    private String education;
    @JsonProperty("University name")
    private String universityName;

    @JsonProperty("University location")
    private String universityLocation;

    @JsonProperty("Degree name")
    private String degreeName;

    @JsonProperty("Degree year")
    private Integer degreeYear;
    @Override
    public void generateDTO() {
        if (this.education == null || this.universityName == null || this.universityLocation == null || this.degreeName == null || this.degreeYear == null) {
            throw new IllegalArgumentException("All fields must be provided for BachelorsDTO");
        }

    }
}
