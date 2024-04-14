package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class PetService implements IPetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    @Transactional
    public Pets addPet(String animalType, String breed, String gender, Integer age, Integer isVaccinated,
            Integer isAdopted,
            MultipartFile photo) throws IOException {
        Pets pet = new Pets();
        pet.setAnimalType(animalType);
        pet.setBreed(breed);
        pet.setGender(gender);
        pet.setAge(age);
        pet.setIsVaccinated(isVaccinated);
        pet.setIsAdopted(isAdopted);
        pet.setPhoto(photo.getBytes()); // Store photo as byte array
        System.out.println("isVaccinated: " + isVaccinated + ", isAdopted: " + isAdopted);

        return petRepository.save(pet);
    }

    @Override
    public List<Pets> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public byte[] getPetPhotoByPetId(Long petId) throws SQLException {
        Optional<Pets> thePet = petRepository.findById(petId);
        if (thePet.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Pet not found!");
        }
        byte[] photoBytes = thePet.get().getPhoto();
        return photoBytes;
    }

    @Override
    public Pets getPetById(Long petId) {
        return petRepository.findById(petId).orElse(null);
    }
    
    

    @Override
    @Transactional
    public Pets updatePet(Long id, String animalType, String breed, String gender, Integer age, Integer isVaccinated,
            Integer isAdopted,
            MultipartFile photo) throws IOException {
        Pets pet = getPetById(id);
        if (animalType != null) {
            pet.setAnimalType(animalType);
        }
        if (breed != null) {
            pet.setBreed(breed);
        }
        if (gender != null) {
            pet.setGender(gender);
        }
        if (age > 0) {
            pet.setAge(age);
        }
        if (isVaccinated >= 0 && isVaccinated <= 2) {
            pet.setIsVaccinated(isVaccinated);
        }
        if (isAdopted >= 0 && isAdopted <= 1) {
            pet.setIsAdopted(isAdopted);
        }
        if (photo != null) {
            pet.setPhoto(photo.getBytes()); // Update photo if provided
        }
        return petRepository.save(pet);
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
    public Pets getPetsByAnimalType(String animalType) {
        return petRepository.findByAnimalType(animalType)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with breed: " + animalType));
    }

    @Override
    public List<String> getAllAnimalTypes() {
        return petRepository.findAllAnimalTypes();
    }

    @Override
    public Pets getPetByBreed(String breed) {
        return petRepository.findByBreed(breed)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with breed: " + breed));
    }

    @Override
    public List<String> getAllBreeds() {
        return petRepository.findAllBreeds();
    }

}
