package com.fmsproject.pet_adoption.response;

import org.springframework.web.multipart.MultipartFile;

public class PetsRequest {

    private String animalType;
    private String breed;
    private String gender;
    private Integer age;
    private Integer isVaccinated;
    private Integer isAdopted;
    private MultipartFile photo;

    // Getters and setters for all fields

    public String getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public int getIsVaccinated() {
        return isVaccinated;
    }

    public void setIsVaccinated(Integer vaccinated) {
        isVaccinated = vaccinated;
    }

    public int getIsAdopted() {
        return isAdopted;
    }

    public void setIsAdopted(Integer adopted) {
        isAdopted = adopted;
    }

    public MultipartFile getPhoto() {
        return photo;
    }

    public void setPhoto(MultipartFile photo) {
        this.photo = photo;
    }
}
