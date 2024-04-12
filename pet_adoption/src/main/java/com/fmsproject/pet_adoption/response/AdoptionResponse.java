package com.fmsproject.pet_adoption.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
// @AllArgsConstructor
@NoArgsConstructor
public class AdoptionResponse {

    private Long petId;

    private LocalDate adoptionDate;

    private String adopterName;

    private String adopterEmail;

    private Long adopterPhoneNo;

    private String confirmationCode;

    // private PetsResponse pet; 

    public AdoptionResponse(Long petId, LocalDate adoptionDate, String adopterName, String adopterEmail, Long adopterPhoneNo, String confirmationCode) {
        this.petId = petId;
        this.adoptionDate = adoptionDate;
        this.adopterName = adopterName;
        this.adopterEmail = adopterEmail;
        this.adopterPhoneNo = adopterPhoneNo;
        this.confirmationCode = confirmationCode;
        // this.pet = pet;
    }
}
