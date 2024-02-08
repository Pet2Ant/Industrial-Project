package com.example.demo.Scheduling;
import com.example.demo.Models.*;

import com.example.demo.Repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Component
public class TableCleanupTask {

    private final EducationRepository educationRepository;
    private final PersonalDetailsRepository personalDetailsRepository;
    private final WorkRepository workRepository;

    private final HobbiesRepository hobbiesRepository;

    private final VolunteeringRepository volunteerRepository;
    private final TechnicalSkillsRepository technicalSkillsRepository;
    private final SeminarsRepository seminarRepository;


    public TableCleanupTask(EducationRepository educationRepository, PersonalDetailsRepository personalDetailsRepository, WorkRepository workRepository, HobbiesRepository hobbiesRepository, VolunteeringRepository volunteerRepository, TechnicalSkillsRepository technicalSkillsRepository, SeminarsRepository seminarRepository) {
        this.educationRepository = educationRepository;
        this.personalDetailsRepository = personalDetailsRepository;
        this.workRepository = workRepository;
        this.hobbiesRepository = hobbiesRepository;
        this.volunteerRepository = volunteerRepository;
        this.technicalSkillsRepository = technicalSkillsRepository;
        this.seminarRepository = seminarRepository;
    }

    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanupTablePesonalDetails () {
        List<Education> educations = educationRepository.findAllByStatus(0);
        for (Education education : educations) {
            educationRepository.delete(education);
        }
        educationRepository.flush();
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanupTableEducation () {
        List<PersonalDetails> personalDetails = personalDetailsRepository.findAllByStatus(0);
        for (PersonalDetails personalDetail : personalDetails) {
            personalDetailsRepository.delete(personalDetail);
        }
        personalDetailsRepository.flush();
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpWork() {
        List<Work> works = workRepository.findAllByStatus(0);
        for (Work work : works) {
            workRepository.delete(work);
        }
        workRepository.flush();
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpVolunteering(){
        List<Volunteering> volunteerings = volunteerRepository.findAllByStatus(0);
        for (Volunteering volunteering : volunteerings) {
            volunteerRepository.delete(volunteering);
        }
        volunteerRepository.flush();
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpHobbies(){
        List<Hobbies> hobbies = hobbiesRepository.findAllByStatus(0);
        for (Hobbies hobby : hobbies) {
            hobbiesRepository.delete(hobby);
        }
        hobbiesRepository.flush();

    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpTechnicalSkills(){
       List<TechnicalSkills> technicalSkills = technicalSkillsRepository.findAllByStatus(0);
        for (TechnicalSkills technicalSkill : technicalSkills) {
            technicalSkillsRepository.delete(technicalSkill);
        }
        technicalSkillsRepository.flush();
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpSeminars(){
        List<Seminars> seminars = seminarRepository.findAllByStatus(0);
        for (Seminars seminar : seminars) {
            seminarRepository.delete(seminar);
        }
        seminarRepository.flush();
    }





}
