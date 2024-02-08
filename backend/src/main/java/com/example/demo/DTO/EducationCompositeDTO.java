package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Setter
@Getter
public class EducationCompositeDTO implements EducationDTO{
    private List<EducationDTO> educationDTOList = new ArrayList<>();
    @Override
    public void generateDTO() {
        for (EducationDTO educationDTO : educationDTOList) {
            educationDTO.generateDTO();
        }
    }
}
