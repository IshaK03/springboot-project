// package com.fmsproject.pet_adoption.model;

// import java.time.LocalDate;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @AllArgsConstructor
// @NoArgsConstructor
// public class AdoptedPets {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "pet_id")
//     private Long petId;

//     @Column(name = "adoption_date")
//     private LocalDate adoptionDate;

//     @Column(name = "adopter_name")
//     private String adopterName;

//     @Column(name = "adopter_email")
//     private String adopterEmail;

//     @Column(name = "adopter_phone_number")
//     private Long adopterPhoneNo;

//     @Column(name = "confirmation_code")
//     private String confirmationCode;

//     @OneToOne(mappedBy = "pet", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//     private Pets pet;
// }

package com.fmsproject.pet_adoption.model;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
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
    private Long id;

    @Column(name = "adoption_date")
    private LocalDate adoptionDate;

    @Column(name = "adopter_name")
    private String adopterName;

    @Column(name = "adopter_email")
    private String adopterEmail;

    @Column(name = "adopter_phone_number")
    private Long adopterPhoneNo;

    @Column(name = "confirmation_code")
    private String confirmationCode;

    @OneToOne(mappedBy = "adoption")
    @MapsId
    private Pets pet;

    public Pets getPet() {
        return this.pet;
    }
    
}
