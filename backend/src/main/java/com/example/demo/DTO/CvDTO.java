package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class CvDTO {
    private List<PersonalDetailsDTO> personalDetails;
    private List<EducationDTO> education;
    private List<SeminarsDTO> seminars;
    private List<WorkDTO> work;
    private List<VolunteeringDTO> volunteering;
    private List<HobbiesDTO> hobbies;
    private List<TechnicalSkillsDTO> technicalSkills;
}
