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
        Long seminarId = seminar.getSeminarId();
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



// SERVER SIDE RENDERING OF PDF FILE
//package com.example.demo.Controllers;
//
//import com.example.demo.DTO.*;
//import com.example.demo.Services.*;
//import com.example.demo.Util.JwtUtil;
//import org.apache.pdfbox.pdmodel.PDDocument;
//import org.apache.pdfbox.pdmodel.PDPage;
//import org.apache.pdfbox.pdmodel.PDPageContentStream;
//import org.apache.pdfbox.pdmodel.font.PDFont;
//import org.apache.pdfbox.pdmodel.font.PDType1Font;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import com.example.demo.Models.*;
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/api/cvBuilder")
//public class CvBuilderController {
//    private final EducationService educationService;
//    private final HobbiesService hobbiesService;
//    private final PersonalDetailsService personalDetailsService;
//    private final SeminarsService seminarsService;
//    private final WorkService workService;
//    private final TechnicalSkillsService technicalSkillsService;
//    private final VolunteeringService volunteeringService;
//    private static final Logger logger = LoggerFactory.getLogger(CvBuilderController.class);
//    private final JwtUtil jwtUtil;
//    private final DataService dataService;
//    public CvBuilderController(EducationService educationService,JwtUtil jwtUtil,DataService dataService, HobbiesService hobbiesService, PersonalDetailsService personalDetailsService, SeminarsService seminarsService, WorkService workService, TechnicalSkillsService technicalSkillsService, VolunteeringService volunteeringService) {
//        this.educationService = educationService;
//        this.hobbiesService = hobbiesService;
//        this.personalDetailsService = personalDetailsService;
//        this.seminarsService = seminarsService;
//        this.workService = workService;
//        this.technicalSkillsService = technicalSkillsService;
//        this.volunteeringService = volunteeringService;
//        this.dataService = dataService;
//        this.jwtUtil = jwtUtil;
//    }
//
//    @GetMapping
//    public ResponseEntity<byte[]> generateCv( @RequestHeader("Authorization") String token) {
//        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
//        Long userId = dataService.getUserId(username).getId();
//
//        PDDocument document = new PDDocument();
//        try {
//            Seminars seminar = seminarsService.getSeminarByUserId(userId);
//            long seminarId = seminar.getSeminarId();
//            List<SeminarsDTO> seminars = seminarsService.getSeminarsById(userId, seminarId);
//            PersonalDetailsDTO personalDetails = personalDetailsService.getPersonalDetailsById(userId, seminarId);
//            EducationDTO education = educationService.getEducationById(userId, seminarId);
//            List<WorkDTO> work = workService.getWorkById(userId, seminarId);
//            List<VolunteeringDTO> volunteering = volunteeringService.getVolunteeringById(userId, seminarId);
//            List<HobbiesDTO> hobbies = hobbiesService.getHobbiesById(userId, seminarId);
//            List<TechnicalSkillsDTO> technicalSkills = technicalSkillsService.getTechnicalSkillsById(userId, seminarId);
//
//            PDPage page = new PDPage();
//            document.addPage(page);
//
//            PDPageContentStream contentStream = new PDPageContentStream(document, page);
//            PDFont font = PDType1Font.HELVETICA_BOLD;
//            int y = 700;
//            float margin = 70;
//            float middle = page.getMediaBox().getWidth() / 2;
//            String personalDetailsText = "Personal Details:";
//            float personalDetailsWidth = font.getStringWidth(personalDetailsText) / 1000 * 12;
//            float personalDetailsX = middle - personalDetailsWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(personalDetailsX, y);
//            contentStream.showText(personalDetailsText);
//            contentStream.endText();
//            y -= 20;
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//            y -= 20;
//
//            String[] details = personalDetails.toPdfString().split(", ");
//            int maxCharsPerLine = 100;
//            for (String detail : details) {
//                // Check if a new page is needed
//                if (y < margin) {
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//                // Text wrapping
//                String[] words = detail.split(" ");
//                StringBuilder line = new StringBuilder();
//
//                for (String word : words) {
//                    if (line.length() + word.length() < maxCharsPerLine) {
//                        line.append(word).append(" ");
//                    } else {
//                        contentStream.beginText();
//                        contentStream.setFont(font, 12);
//                        contentStream.newLineAtOffset(25, y);
//                        contentStream.showText(line.toString());
//                        contentStream.endText();
//                        y -= 20;
//                        line = new StringBuilder(word).append(" ");
//                    }
//                }
//                contentStream.beginText();
//                contentStream.setFont(font, 12);
//                contentStream.newLineAtOffset(25, y);
//                contentStream.showText(line.toString()); // Show the last line
//                contentStream.endText();
//                y -= 20;
//            }
//
//            y -= 40;
//// Education
//            if (y < margin) {
//                contentStream.close();
//                PDPage newPage = new PDPage();
//                document.addPage(newPage);
//                contentStream = new PDPageContentStream(document, newPage);
//                y = (int)( newPage.getMediaBox().getHeight() - margin);
//            }
//            String educationText = "Education:";
//            float educationWidth = font.getStringWidth(educationText) / 1000 * 12;
//            float educationX = middle - educationWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(educationX, y);
//            contentStream.showText(educationText);
//            contentStream.endText();
//            y -= 20;
//
//// Draw divider
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//            y -= 20;
//
//            String[] educationDetails = education.toPdfString().split(", ");
//            for (String detail : educationDetails) {
//                // Text wrapping
//                String[] words = detail.split(" ");
//                StringBuilder line = new StringBuilder();
//
//                for (String word : words) {
//                    if (line.length() + word.length() < maxCharsPerLine) {
//                        line.append(word).append(" ");
//                    } else {
//                        contentStream.beginText();
//                        contentStream.setFont(font, 12);
//                        contentStream.newLineAtOffset(25, y);
//                        contentStream.showText(line.toString());
//                        contentStream.endText();
//                        y -= 20;
//                        line = new StringBuilder(word).append(" ");
//                    }
//                }
//                contentStream.beginText();
//                contentStream.setFont(font, 12);
//                contentStream.newLineAtOffset(25, y);
//                contentStream.showText(line.toString()); // Show the last line
//                contentStream.endText();
//                y -= 20;
//            }
//
//            y -= 40;
//
//// Work
//            String workText = "Worked at:";
//            float workWidth = font.getStringWidth(workText) / 1000 * 12;
//            float workX = middle - workWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(workX, y);
//            contentStream.showText(workText);
//            contentStream.endText();
//            y -= 20;
//            for (WorkDTO workItem : work) {
//                if (y < margin) {
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//
//
//                // Draw divider
//                contentStream.setLineWidth(1f); // Set the line width
//                contentStream.moveTo(margin, y); //
//                contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//                contentStream.stroke();
//                y -= 20;
//
//                String[] workDetails = workItem.toPdfString().split(", ");
//                for (String detail : workDetails) {
//                    if (y < margin) {
//                        contentStream.close();
//                        PDPage newPage = new PDPage();
//                        document.addPage(newPage);
//                        contentStream = new PDPageContentStream(document, newPage);
//                        y = (int)( newPage.getMediaBox().getHeight() - margin);
//                    }
//
//                    // Text wrapping
//                    String[] words = detail.split(" ");
//                    StringBuilder line = new StringBuilder();
//
//                    for (String word : words) {
//                        if (line.length() + word.length() < maxCharsPerLine) {
//                            line.append(word).append(" ");
//                        } else {
//                            contentStream.beginText();
//                            contentStream.setFont(font, 12);
//                            contentStream.newLineAtOffset(25, y);
//                            contentStream.showText(line.toString());
//                            contentStream.endText();
//                            y -= 20;
//                            line = new StringBuilder(word).append(" ");
//                        }
//                    }
//                    contentStream.beginText();
//                    contentStream.setFont(font, 12);
//                    contentStream.newLineAtOffset(25, y);
//                    contentStream.showText(line.toString()); // Show the last line
//                    contentStream.endText();
//                    y -= 20;
//                }
//
//                y -= 40;
//            }
//
//
//            String volunteeringText = "Volunteering and Projects:";
//            float volunteeringWidth = font.getStringWidth(volunteeringText) / 1000 * 12;
//            float volunteeringX = middle - volunteeringWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(volunteeringX, y);
//            contentStream.showText(volunteeringText);
//            contentStream.endText();
//            y -= 20;
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//
//            for (VolunteeringDTO volunteeringItem : volunteering) {
//                if (y < margin) {
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//                y -= 20;
//
//                String[] volunteeringDetails = volunteeringItem.toPdfString().split(", ");
//                for (String detail : volunteeringDetails) {
//                    if (y < margin) {
//                        contentStream.close();
//                        PDPage newPage = new PDPage();
//                        document.addPage(newPage);
//                        contentStream = new PDPageContentStream(document, newPage);
//                        y = (int)( newPage.getMediaBox().getHeight() - margin);
//                    }
//                    contentStream.beginText();
//                    contentStream.setFont(font, 12);
//                    contentStream.newLineAtOffset(25, y);
//                    contentStream.showText(detail);
//                    contentStream.endText();
//                    y -= 20;
//                }
//
//                y -= 40;
//            }
//
//            String hobbiesText = "Hobbies:";
//            float hobbiesWidth = font.getStringWidth(hobbiesText) / 1000 * 12;
//            float hobbiesX = middle - hobbiesWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(hobbiesX, y);
//            contentStream.showText(hobbiesText);
//            contentStream.endText();
//            y -= 20;
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//
//            for (HobbiesDTO hobbiesItem : hobbies) {
//                if (y < margin) {
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//
//
//                y -= 20;
//
//                String[] hobbiesDetails = hobbiesItem.toPdfString().split(", ");
//                for (String detail : hobbiesDetails) {
//                    if (y < margin) {
//                        contentStream.close();
//                        PDPage newPage = new PDPage();
//                        document.addPage(newPage);
//                        contentStream = new PDPageContentStream(document, newPage);
//                        y = (int)( newPage.getMediaBox().getHeight() - margin);
//                    }
//                    contentStream.beginText();
//                    contentStream.setFont(font, 12);
//                    contentStream.newLineAtOffset(25, y);
//                    contentStream.showText(detail);
//                    contentStream.endText();
//                    y -= 20;
//                }
//
//                y -= 40;
//            }
//
//            String technicalSkillsText = "Technical Skills:";
//            float technicalSkillsWidth = font.getStringWidth(technicalSkillsText) / 1000 * 12;
//            float technicalSkillsX = middle - technicalSkillsWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(technicalSkillsX, y);
//            contentStream.showText(technicalSkillsText);
//            contentStream.endText();
//            y -= 20;
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//
//            for (TechnicalSkillsDTO technicalSkillsItem : technicalSkills) {
//                if (y < margin) {
//                    if (y < margin) {
//                        contentStream.close();
//                        PDPage newPage = new PDPage();
//                        document.addPage(newPage);
//                        contentStream = new PDPageContentStream(document, newPage);
//                        y = (int)( newPage.getMediaBox().getHeight() - margin);
//                    }
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//
//
//                y -= 20;
//
//                String[] technicalSkillsDetails = technicalSkillsItem.toPdfString().split(", ");
//                for (String detail : technicalSkillsDetails) {
//                    contentStream.beginText();
//                    contentStream.setFont(font, 12);
//                    contentStream.newLineAtOffset(25, y);
//                    contentStream.showText(detail);
//                    contentStream.endText();
//                    y -= 20;
//                }
//
//                y -= 40;
//            }
//            String seminarsText = "Seminars:";
//            float seminarsWidth = font.getStringWidth(seminarsText) / 1000 * 12;
//            float seminarsX = middle - seminarsWidth / 2;
//            contentStream.beginText();
//            contentStream.setFont(font, 12);
//            contentStream.newLineAtOffset(seminarsX, y);
//            contentStream.showText(seminarsText);
//            contentStream.endText();
//            y -= 20;
//            contentStream.setLineWidth(1f); // Set the line width
//            contentStream.moveTo(margin, y); //
//            contentStream.lineTo(page.getMediaBox().getWidth() - margin, y); // Draw the line to the end point
//            contentStream.stroke();
//
//            for (SeminarsDTO seminarItem : seminars) {
//                if (y < margin) {
//                    contentStream.close();
//                    PDPage newPage = new PDPage();
//                    document.addPage(newPage);
//                    contentStream = new PDPageContentStream(document, newPage);
//                    y = (int)( newPage.getMediaBox().getHeight() - margin);
//                }
//
//
//
//                y -= 20;
//
//                String[] seminarDetails = seminarItem.toPdfString().split(", ");
//                for (String detail : seminarDetails) {
//                    if (y < margin) {
//                        contentStream.close();
//                        PDPage newPage = new PDPage();
//                        document.addPage(newPage);
//                        contentStream = new PDPageContentStream(document, newPage);
//                        y = (int)( newPage.getMediaBox().getHeight() - margin);
//                    }
//                    contentStream.beginText();
//                    contentStream.setFont(font, 12);
//                    contentStream.newLineAtOffset(25, y);
//                    contentStream.showText(detail);
//                    contentStream.endText();
//                    y -= 20;
//                }
//
//                y -= 40;
//            }
//            contentStream.close();
//            ByteArrayOutputStream output = new ByteArrayOutputStream();
//            document.save(output);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            headers.setContentDispositionFormData("filename", "cv.pdf");
//            return new ResponseEntity<>(output.toByteArray(), headers, HttpStatus.OK);
//        } catch (IOException e) {
//            logger.error("Error occurred while creating PDF", e);
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        } finally {
//            try {
//                document.close();
//            } catch (IOException e) {
//                logger.error("Error occurred while closing PDF", e);
//            }
//
//        }
//    }
//
//
//
//}
