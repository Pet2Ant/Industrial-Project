package com.example.demo.Scheduling;
import com.example.demo.Models.*;

import com.example.demo.Repository.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public void cleanUpRecords() {
        List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAll();
        Set<Long> userIdsWithPersonalDetails = personalDetailsList.stream()
                .map(PersonalDetails::getUserId)
                .collect(Collectors.toSet());

        // Check each table and delete records that don't have a corresponding PersonalDetails record
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, educationRepository, Education.class);
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, workRepository, Work.class);
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, volunteerRepository, Volunteering.class);
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, hobbiesRepository, Hobbies.class);
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, technicalSkillsRepository, TechnicalSkills.class);
        deleteIfNoPersonalDetails(userIdsWithPersonalDetails, seminarRepository, Seminars.class);
    }


    private void deleteIfNoPersonalDetails(Set<Long> userIdsWithPersonalDetails, JpaRepository repository, Class<?> entityClass) {
        List<?> records = repository.findAll();
        for (Object record : records) {
            Long userId;
            Long seminarId;
            if (entityClass.equals(Education.class)) {
                userId = ((Education) record).getUserId();
                seminarId = ((Education) record).getSeminarId();
            } else if (entityClass.equals(Work.class)) {
                userId = ((Work) record).getUserId();
                seminarId = ((Work) record).getSeminarId();
            } else if (entityClass.equals(Volunteering.class)) {
                userId = ((Volunteering) record).getUserId();
                seminarId = ((Volunteering) record).getSeminarId();
            } else if (entityClass.equals(Hobbies.class)) {
                userId = ((Hobbies) record).getUserId();
                seminarId = ((Hobbies) record).getSeminarId();
            } else if (entityClass.equals(TechnicalSkills.class)) {
                userId = ((TechnicalSkills) record).getUserId();
                seminarId = ((TechnicalSkills) record).getSeminarId();
            } else if (entityClass.equals(Seminars.class)) {
                userId = ((Seminars) record).getUserId();
                seminarId = ((Seminars) record).getSeminarId();
            } else {
                throw new IllegalArgumentException("Unsupported entity class: " + entityClass);
            }
            PersonalDetails personalDetails = personalDetailsRepository.findByUserIdAndSeminarId(userId, seminarId);
            if (personalDetails == null) {
                repository.delete(record);
            }
        }
        repository.flush();
    }



    @Transactional
    @Scheduled(fixedRate = 1800000)
    public void cleanUpAll() {
        List<PersonalDetails> personalDetails = personalDetailsRepository.findAllByStatus(0);
        if (personalDetails.isEmpty()) {
            cleanupTablePesonalDetails();
            cleanupTableEducation();
            cleanUpWork();
            cleanUpVolunteering();
            cleanUpHobbies();
            cleanUpTechnicalSkills();
            cleanUpSeminars();
        }
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
