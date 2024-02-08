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
        List<Education> educations = educationRepository.findAll();
        for (Education education : educations) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(education.getUserId(), education.getSeminarId());
            if (personalDetailsList.isEmpty()) {
                educationRepository.delete(education);
                educationRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanupTableEducation () {
        List<PersonalDetails> personalDetailsList2 = personalDetailsRepository.findAll();
        for (PersonalDetails personalDetails2 : personalDetailsList2) {
            List<Education> educations2 = educationRepository.findAllByUserIdAndSeminarId(personalDetails2.getUserId(), personalDetails2.getSeminarId());
            if (educations2.isEmpty()) {
                personalDetailsRepository.delete(personalDetails2);
                personalDetailsRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpWork() {
        List<Work> works = workRepository.findAll();
        for (Work work : works) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            List<Education> educations = educationRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            if (personalDetailsList.isEmpty() && educations.isEmpty()) {
                workRepository.delete(work);
                workRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpVolunteering(){
        List<Volunteering> works = volunteerRepository.findAll();
        for (Volunteering work : works) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            List<Education> educations = educationRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            if (personalDetailsList.isEmpty() && educations.isEmpty()) {
                volunteerRepository.delete(work);
                volunteerRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpHobbies(){
        List<Hobbies> works = hobbiesRepository.findAll();
        for (Hobbies work : works) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            List<Education> educations = educationRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            if (personalDetailsList.isEmpty() && educations.isEmpty()) {
                hobbiesRepository.delete(work);
                hobbiesRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpTechnicalSkills(){
        List<TechnicalSkills> works = technicalSkillsRepository.findAll();
        for (TechnicalSkills work : works) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            List<Education> educations = educationRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            if (personalDetailsList.isEmpty() && educations.isEmpty()) {
                technicalSkillsRepository.delete(work);
                technicalSkillsRepository.flush();
            }
        }
    }
    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpSeminars(){
        List<Seminars> works = seminarRepository.findAll();
        for (Seminars work : works) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            List<Education> educations = educationRepository.findAllByUserIdAndSeminarId(work.getUserId(), work.getSeminarId());
            if (personalDetailsList.isEmpty() && educations.isEmpty()) {
                seminarRepository.delete(work);
                seminarRepository.flush();
            }
        }
    }





}
