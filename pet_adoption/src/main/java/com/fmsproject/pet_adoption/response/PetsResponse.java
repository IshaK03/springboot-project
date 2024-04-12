package com.fmsproject.pet_adoption.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;

@Data
@NoArgsConstructor
public class PetsResponse {
    private Long id;
    private String animalType;
    private String breed;
    private String gender;
    private Integer age;
    private Integer isVaccinated;
    private Integer isAdopted;
    private String photo;
    private List<AdoptionResponse> adoptions;


    public PetsResponse(Long id, String animalType, String breed, String gender, Integer age, Integer isVaccinated, Integer isAdopted) {
        this.id = id;
        this.animalType = animalType;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.isVaccinated = isVaccinated;
        this.isAdopted = isAdopted;
    }

    public PetsResponse(Long id, String animalType, String breed, String gender, Integer age, Integer isVaccinated, Integer isAdopted, byte[] photoBytes) {
        this(id, animalType, breed, gender, age, isVaccinated, isAdopted);
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }
    // public PetsResponse(Long id, String animalType, String breed, String gender, Integer age, Integer isVaccinated, Integer isAdopted, byte[] photoBytes, List<AdoptionResponse> adoptions) {
    //     this(id, animalType, breed, gender, age, isVaccinated, isAdopted);
    //     this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    //     this.adoptions = adoptions;
    // }
}
