package com.example.demo.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private Long id;
    private int section;
    private String comment;
    @JsonProperty("Date: ")
    private String date;
    @JsonProperty("From user: ")
    private String username;
}
