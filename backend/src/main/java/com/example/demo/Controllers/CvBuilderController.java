package com.example.demo.Controllers;

import com.example.demo.DTO.*;
import com.example.demo.Services.*;
import com.example.demo.Util.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Models.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cvBuilder")
public class CvBuilderController {
    private final EducationService educationService;
    private final HobbiesService hobbiesService;
    private final PersonalDetailsService personalDetailsService;
    private final SeminarsService seminarsService;
    private final WorkService workService;
    private final TechnicalSkillsService technicalSkillsService;
    private final VolunteeringService volunteeringService;
    private final JwtUtil jwtUtil;
    private final DataService dataService;

    public CvBuilderController(EducationService educationService, JwtUtil jwtUtil, DataService dataService, HobbiesService hobbiesService, PersonalDetailsService personalDetailsService, SeminarsService seminarsService, WorkService workService, TechnicalSkillsService technicalSkillsService, VolunteeringService volunteeringService) {
        this.educationService = educationService;
        this.hobbiesService = hobbiesService;
        this.personalDetailsService = personalDetailsService;
        this.seminarsService = seminarsService;
        this.workService = workService;
        this.technicalSkillsService = technicalSkillsService;
        this.volunteeringService = volunteeringService;
        this.dataService = dataService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<CvDTO> generateCv(@RequestHeader("Authorization") String token) {

        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        Long userId = dataService.getUserId(username).getId();
        Seminars seminar = seminarsService.getSeminarByUserId(userId);
        long seminarId = seminar.getSeminarId();
        List<PersonalDetailsDTO> personalDetails =  personalDetailsService.getPersonalDetailsListById(userId,seminarId);
        List<EducationDTO> education = educationService.getEducationListById(userId,seminarId);
        List<SeminarsDTO> seminars = seminarsService.getSeminarsById(userId, seminarId);
        List<WorkDTO> work = workService.getWorkById(userId, seminarId);
        List<VolunteeringDTO> volunteering = volunteeringService.getVolunteeringById(userId, seminarId);
        List<HobbiesDTO> hobbies = hobbiesService.getHobbiesById(userId, seminarId);
        List<TechnicalSkillsDTO> technicalSkills = technicalSkillsService.getTechnicalSkillsById(userId, seminarId);
        CvDTO cv = new CvDTO();
        cv.setPersonalDetails(personalDetails);
        cv.setEducation(education);
        cv.setSeminars(seminars);
        cv.setWork(work);
        cv.setVolunteering(volunteering);
        cv.setHobbies(hobbies);
        cv.setTechnicalSkills(technicalSkills);
        return ResponseEntity.ok(cv);
    }



}
