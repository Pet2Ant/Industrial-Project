package com.example.demo.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "application_id")
    private long applicationId;
    @Column(name = "user_id")
    private long userId;
    @Column(name ="manager_id")
    private long managerId;
    @Column(name = "comment")
    private String comment;
    @Column(name = "date")
    private LocalDateTime date;
    @Column(name = "username")
    private String username;
    @Column(name ="section")
    private int section;
}
