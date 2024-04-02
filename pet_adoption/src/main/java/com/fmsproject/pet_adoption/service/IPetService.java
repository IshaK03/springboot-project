package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.model.Pets;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IPetService {
    Pets addPet(Pets pet);

    List<Pets> getAllPets();

    Pets getPetById(Long id);

    Pets updatePet(Long id, Pets pet);

    void deletePet(Long id);

    byte[] getPetPhotoByPetId(Long petId) throws SQLException;
}
