package com.fmsproject.pet_adoption.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.fmsproject.pet_adoption.model.Pets;

@Data
// @AllArgsConstructor
@NoArgsConstructor
public class AdoptionResponse {

    private Long id;

    private LocalDate adoptionDate;

    private String adopterName;

    private String adopterEmail;

    private Long adopterPhoneNo;

    private String confirmationCode;

    private Pets pet; 

    public AdoptionResponse(Long Id, String adopterName, String adopterEmail, Long adopterPhoneNo, String confirmationCode, LocalDate adoptionDate, Pets pet) {
        this.id = Id;
        this.adopterName = adopterName;
        this.adopterEmail = adopterEmail;
        this.adopterPhoneNo = adopterPhoneNo;
        this.confirmationCode = confirmationCode;
        this.adoptionDate = adoptionDate;
        this.pet = pet;
    }
}
