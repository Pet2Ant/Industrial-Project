package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PersonalDetailsDTO {
    @JsonProperty("First name: ")
    private String firstName;
    @JsonProperty("Last name: ")
    private String lastName;
    @JsonProperty("Country: ")
    private String country;
    @JsonProperty("City: ")
    private String city;
    @JsonProperty("Pronouns: ")
    private String pronouns;
    @JsonProperty("Email: ")
    private String email;
    @JsonProperty("Phone: ")
    private String phone;
    @JsonProperty("External links: ")
    private String externalLinks;
    @JsonProperty("Brief Statement: ")
    private String education;
    @JsonProperty("Seminar: ")
    private long seminarId;


}
