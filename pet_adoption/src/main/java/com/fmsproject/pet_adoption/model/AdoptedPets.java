package com.fmsproject.pet_adoption.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdoptedPets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @Column(name = "Adoption_Date")
    private LocalDate adoptionDate;

    @Column(name = "Adopter_Name")
    private String adopterName;

    @Column(name = "Adopter_Email")
    private String adopterEmail;

    @Column(name = "Adopter_Phone_Number")
    private Long adopterPhoneNo;

    @Column(name = "Confirmation_Code")
    private String confirmationCode;

    @OneToOne
    @JoinColumn(name = "pet_id", unique = true)
    private Pets pet;
}
