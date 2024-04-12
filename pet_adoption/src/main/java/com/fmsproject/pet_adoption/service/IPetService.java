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
import java.sql.SQLException;
import java.util.List;

public interface IPetService {

    Pets addPet(String animalType, String breed, String gender, Integer age, Integer isVaccinated, Integer isAdopted, MultipartFile photo) throws IOException;

    List<Pets> getAllPets();

    byte[] getPetPhotoByPetId(Long petId) throws SQLException;

    Pets getPetById(Long id);

    Pets updatePet(Long id, String animalType, String breed, String gender, Integer age, Integer isVaccinated, Integer isAdopted, MultipartFile photo) throws IOException;

    void deletePet(Long id);

    Pets getPetByBreed(String breed);

    List<String> getAllBreeds();

    Pets getPetsByAnimalType(String animalType);

    List<String> getAllAnimalTypes();

}
