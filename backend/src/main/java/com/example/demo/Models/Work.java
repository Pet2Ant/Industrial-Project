package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;
@Getter
@Setter
@Entity
@Table(name = "work")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id",nullable = false)
    private long userId;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "work_place")
    private String workPlace;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "experience", length = 2000) // Assuming experience can be quite long
    private String experience;

    @Column(name = "responsibilities", length = 2000) // Assuming responsibilities can be quite long
    private String responsibilities;
    @Column(name ="application_status")
    private long status;
}
