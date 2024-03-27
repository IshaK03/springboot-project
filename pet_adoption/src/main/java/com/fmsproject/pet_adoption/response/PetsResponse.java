package com.fmsproject.pet_adoption.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;


@Data
@NoArgsConstructor
public class PetsResponse {
    private Long id;
    private String breed;
    private String gender;
    private int age;
    private boolean isVaccinated;
    private boolean isAdopted;
    private String photo;

    public PetsResponse(Long id, String breed, String gender, int age, boolean isVaccinated, boolean isAdopted, byte[] photoBytes) {
        this.id = id;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.isVaccinated = isVaccinated;
        this.isAdopted = isAdopted;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }
}
