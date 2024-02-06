package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkDTO {
    @JsonProperty("Work")
    private String work;
    @JsonProperty("Start date")
    private String startDate;
    @JsonProperty("End date")
    private String endDate;
    @JsonProperty("Experience") // Assuming experience can be quite long
    private String experience;

    @JsonProperty("Responsibilities") // Assuming responsibilities can be quite long
    private String responsibilities;
    public String toPdfString() {
        return "Working place: " + work +""+
                ", Started working at: " + startDate +""+
                ", Parted ways at: " + endDate +""+
                ", Experience during stay: " + experience +""+
                ", Responsibilities during stay: " + responsibilities+"";
    }
}
