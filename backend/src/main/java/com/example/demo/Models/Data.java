package com.example.demo.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "data")
@Setter
@Getter
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    @NotBlank
    @Size(min = 4, max = 16)
    private String username;

    @Column(nullable = false, unique = true)
    @Email
    @NotBlank
    private String email;

    @Column(nullable = false)
    @NotBlank
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phone;

    @Column(nullable = false)
    @NotBlank
    @Size(min = 8, max = 32)
    @Pattern(regexp="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,16}$")
    private String password;

}
