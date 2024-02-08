package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "personal_details")
public class PersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id",nullable = false)
    private long userId;

    @Column(name = "first_name",nullable = false)
    private String firstName;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "pronouns")
    private String pronouns;
    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "external_links")
    private String externalLinks;

    @Column(name = "education")
    private String education;

}
