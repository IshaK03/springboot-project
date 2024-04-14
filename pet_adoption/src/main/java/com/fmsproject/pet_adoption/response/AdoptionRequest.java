package com.fmsproject.pet_adoption.response;

import java.time.LocalDate;

public class AdoptionRequest {

    private Long id;
    private String adopterName;
    private String adopterEmail;
    private Long adopterPhoneNo;
    private String confirmationCode;
    private LocalDate adoptionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long petId) {
        this.id = petId;
    }

    public String getAdopterName() {
        return adopterName;
    }

    public void setAdopterName(String adopterName) {
        this.adopterName = adopterName;
    }

    public String getAdopterEmail() {
        return adopterEmail;
    }

    public void setAdopterEmail(String adopterEmail) {
        this.adopterEmail = adopterEmail;
    }

    public Long getAdopterPhoneNo() {
        return adopterPhoneNo;
    }

    public void setAdopterPhoneNo(Long adopterPhoneNo) {
        this.adopterPhoneNo = adopterPhoneNo;
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public LocalDate getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(LocalDate adoptionDate) {
        this.adoptionDate = adoptionDate;
    }
}
