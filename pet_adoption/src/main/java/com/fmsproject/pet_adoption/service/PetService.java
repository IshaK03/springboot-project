package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.exception.InternalServerException;
import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetService implements IPetService {

    private final PetRepository petRepository;

    @Override
    public Pets addPet(Pets pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pets> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public Pets getPetById(Long id) {
        Optional<Pets> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            return optionalPet.get();
        } else {
            throw new ResourceNotFoundException("Pet not found with ID: " + id);
        }
    }

    @Override
    public Pets updatePet(Long id, Pets pet) {
        if (petRepository.existsById(id)) {
            pet.setId(id);
            return petRepository.save(pet);
        } else {
            throw new ResourceNotFoundException("Pet not found with ID: " + id);
        }
    }

    @Override
    public void deletePet(Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Pet not found with ID: " + id);
        }
    }

    @Override
    public byte[] getPetPhotoByPetId(Long petId) throws SQLException {
        Optional<Pets> thePet = petRepository.findById(petId);
        if (thePet.isEmpty()) {
            throw new ResourceNotFoundException("Pet not found with ID: " + petId);
        }
        Blob photoBlob = thePet.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }
}
