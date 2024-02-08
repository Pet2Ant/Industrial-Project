package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;


@Getter
@Setter
@Entity
@Table(name = "volunteering")
public class Volunteering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id",nullable = false)
    private long userId;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "volunteer", length = 2000) // Assuming volunteer work can be quite long
    private String volunteer;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
}
