package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SeminarsDTO {
    @JsonProperty("Seminars")
    private String seminar;
    @JsonProperty("Start date")
    private String startDate;
    @JsonProperty("End date")
    private String endDate;
    public String toPdfString() {
        return "Seminars: " + seminar +""+
                ", Start date: " + startDate +""+
                ", End date: " + endDate+"";
    }
}
