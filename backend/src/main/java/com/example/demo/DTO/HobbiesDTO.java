package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HobbiesDTO {
    @JsonProperty("Hobbies")
    private String hobbies;
    @JsonProperty("Achievements")
    private String achievements;

    public String toPdfString() {
        return "Hobbies: " + hobbies +""+
                ", Achievements: " + achievements+"";
    }

}
