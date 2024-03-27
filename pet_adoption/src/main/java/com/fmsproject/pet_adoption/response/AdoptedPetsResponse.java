package com.fmsproject.pet_adoption.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdoptedPetsResponse {
    private Long petId;
    private LocalDate adoptionDate;
    private String adopterName;
    private String adopterEmail;
    private Long adopterPhoneNo;
    private String confirmationCode;
}
