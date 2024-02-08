package com.example.demo.Scheduling;
import com.example.demo.Models.Education;
import com.example.demo.Models.PersonalDetails;
import com.example.demo.Repository.EducationRepository;
import com.example.demo.Repository.PersonalDetailsRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Component
public class TableCleanupTask {

    private final EducationRepository educationRepository;
    private final PersonalDetailsRepository personalDetailsRepository;

    public TableCleanupTask(EducationRepository educationRepository, PersonalDetailsRepository personalDetailsRepository) {
        this.educationRepository = educationRepository;
        this.personalDetailsRepository = personalDetailsRepository;
    }

//    @Scheduled(fixedRate = 12) // runs every 60 seconds
//    public void cleanupTables() {
//        List<Education> educations = educationRepository.findAll();
//        for (Education education : educations) {
//            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(education.getUserId(), education.getSeminarId());
//            for (PersonalDetails personalDetails : personalDetailsList) {
//                if(personalDetails.getUserId() == education.getUserId() && personalDetails.getSeminarId() == education.getSeminarId()) {
//                    if (education.getEducation() == null || education.getEducation().isEmpty()) {
//                        personalDetailsRepository.delete(personalDetails);
//                    }
//                    if (personalDetails.getFirstName() == null || personalDetails.getLastName() == null || personalDetails.getPronouns() == null || personalDetails.getCountry() == null || personalDetails.getCity() == null || personalDetails.getEmail() == null || personalDetails.getPhone() == null) {
//                        educationRepository.delete(education);
//                    }
//                }
//
//            }
//        }
//    }


    @Transactional
    @Scheduled(fixedRate = 6000000)
    public void cleanupTables() {
        List<Education> educations = educationRepository.findAll();
        for (Education education : educations) {
            List<PersonalDetails> personalDetailsList = personalDetailsRepository.findAllByUserIdAndSeminarId(education.getUserId(), education.getSeminarId());
            if (personalDetailsList.isEmpty()) {
                educationRepository.delete(education);
                educationRepository.flush();
            }
        }
        List<PersonalDetails> personalDetailsList2 = personalDetailsRepository.findAll();
        for (PersonalDetails personalDetails2 : personalDetailsList2) {
            List<Education> educations2 = educationRepository.findAllByUserIdAndSeminarId(personalDetails2.getUserId(), personalDetails2.getSeminarId());
            if (educations2.isEmpty()) {
                personalDetailsRepository.delete(personalDetails2);
                personalDetailsRepository.flush();
            }

        }
    }




}
