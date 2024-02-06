package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TechnicalSkillsDTO {
    @JsonProperty("Technical skills")
    private String technicalSkills;
    public String toPdfString() {
        return "Technical skills: " + technicalSkills;
    }
}
