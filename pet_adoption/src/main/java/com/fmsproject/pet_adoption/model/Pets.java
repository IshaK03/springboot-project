// package com.fmsproject.pet_adoption.model;

// import java.sql.Blob;

// import org.springframework.web.multipart.MultipartFile;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.Lob;
// import jakarta.persistence.OneToOne;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @NoArgsConstructor // Adding no-args constructor
// @AllArgsConstructor // Adding all-args constructor
// public class Pets {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String animalType; 
//     private String breed;
//     private String gender;
//     private Integer age;
//     private Integer isVaccinated;

//     @Lob
//     @Column(length = 1048576)
//     private byte[] photo;


//     private Integer isAdopted;

//     @OneToOne(mappedBy = "adoptedPetId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//     private AdoptedPets adoption;
    
// }

package com.fmsproject.pet_adoption.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String animalType; 
    private String breed;
    private String gender;
    private Integer age;
    private Integer isVaccinated;

    @Column(length = 1048576)
    private byte[] photo;

    private Integer isAdopted;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private AdoptedPets adoption;
}
