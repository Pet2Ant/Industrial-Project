package com.example.demo.Models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@Entity
@Table(name = "seminars")

public class Seminars {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "seminar",length = 2000)
    private String seminar;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "user_id",nullable = false)
    private long userId;
    @Column(name ="application_status")
    private long status;

}
