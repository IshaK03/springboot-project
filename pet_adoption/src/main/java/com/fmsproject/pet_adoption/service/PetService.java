package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PetService implements IPetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    @Transactional
    public Pets addPet(String breed, String gender, int age, boolean isVaccinated, boolean isAdopted,
            MultipartFile photo) throws IOException {
        Pets pet = new Pets();
        pet.setBreed(breed);
        pet.setGender(gender);
        pet.setAge(age);
        pet.setVaccinated(isVaccinated);
        pet.setAdopted(isAdopted);
        pet.setPhoto(photo.getBytes()); // Store photo as byte array

        return petRepository.save(pet);
    }

    @Override
    public List<Pets> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public Pets getPetById(Long id) {
        Optional<Pets> optionalPet = petRepository.findById(id);
        return optionalPet.orElseThrow(() -> new ResourceNotFoundException("Pet not found with ID: " + id));
    }

    @Override
    @Transactional
    public Pets updatePet(Long id, String breed, String gender, Integer age, Boolean isVaccinated, Boolean isAdopted,
            MultipartFile photo) throws IOException {
        Pets pet = getPetById(id);
        if (breed != null) {
            pet.setBreed(breed);
        }
        if (gender != null) {
            pet.setGender(gender);
        }
        if (age != null) {
            pet.setAge(age);
        }
        if (isVaccinated != null) {
            pet.setVaccinated(isVaccinated);
        }
        if (isAdopted != null) {
            pet.setAdopted(isAdopted);
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
    public Pets getPetByBreed(String breed) {
        return petRepository.findByBreed(breed)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with breed: " + breed));
    }

    @Override
    public List<String> getAllBreeds() {
        return petRepository.findAllBreeds();
    }

    @Override
    public byte[] getPetPhotoByPetId(Long petId) {
        Pets pet = getPetById(petId);
        return pet.getPhoto();
    }
}
