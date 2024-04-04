// package com.fmsproject.pet_adoption.service;

// import com.fmsproject.pet_adoption.model.Pets;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.sql.SQLException;
// import java.util.List;
// import java.util.Optional;

// public interface IPetService {
//     Pets addPet(Pets pet);
    
//     List<Pets> getAllPets();

//     Pets getPetById(Long id);

//     Pets updatePet(Long id, Pets pet);

//     void deletePet(Long id);

//     byte[] getPetPhotoByPetId(Long petId) throws SQLException;
// }

package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.model.Pets;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPetService {

    Pets addPet(String breed, String gender, int age, boolean isVaccinated, boolean isAdopted, MultipartFile photo) throws IOException;

    List<Pets> getAllPets();

    Pets getPetById(Long id);

    Pets updatePet(Long id, String breed, String gender, Integer age, Boolean isVaccinated, Boolean isAdopted, MultipartFile photo) throws IOException;

    void deletePet(Long id);

    byte[] getPetPhotoByPetId(Long petId);
}
