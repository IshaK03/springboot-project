package com.fmsproject.pet_adoption.model;

import java.sql.Blob;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor // Adding no-args constructor
@AllArgsConstructor // Adding all-args constructor
public class Pets {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String breed;
    private String gender;
    private int age;
    private boolean isVaccinated;
    
    @Lob
    private Blob photo;
    
    private boolean isAdopted = false;

    @OneToOne(mappedBy = "pet", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private AdoptedPets adoption;
}
