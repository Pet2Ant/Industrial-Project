package com.example.demo.Models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hobbies")
public class Hobbies  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "seminar_id",nullable = false)
    private long seminarId;
    @Column(name = "user_id", nullable = false)
    private long userId;

    @Column(name = "hobbies", length = 2000) // Assuming hobbies can be quite long
    private String hobbies;

    @Column(name = "achievements", length = 2000) // Assuming achievements can be quite long
    private String achievements;

}