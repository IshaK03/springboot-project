package com.fmsproject.pet_adoption.controller;

import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.response.PetsRequest;
import com.fmsproject.pet_adoption.response.PetsResponse;
import com.fmsproject.pet_adoption.service.IPetService;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    @Autowired
    private IPetService petsService;

    @PostMapping("/add")
    public ResponseEntity<PetsResponse> addPet(@ModelAttribute PetsRequest request) {
        try {
            // Log the received request to check if isVaccinated and isAdopted are correctly
            // received
            System.out.println("Received isVaccinated: " + request.getIsVaccinated() + ", isAdopted: " + request.getIsAdopted());
            System.out.println("Received PetsRequest: " + request);
    
            Pets savedPet = petsService.addPet(request.getAnimalType(), request.getBreed(), request.getGender(),
                    request.getAge(),
                    request.getIsVaccinated(), request.getIsAdopted(), request.getPhoto());
            PetsResponse petResponse = convertToResponse(savedPet);
            return ResponseEntity.ok(petResponse);
        } catch (IOException e) {
            // Handle file upload error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<PetsResponse> getPetById(@PathVariable Long id) {
        Pets pet = petsService.getPetById(id);
        PetsResponse petResponse = convertToResponse(pet);
        return ResponseEntity.ok(petResponse);
    }

    @GetMapping
    public ResponseEntity<List<PetsResponse>> getAllPets() {
        List<Pets> pets = petsService.getAllPets();
        List<PetsResponse> petResponses = pets.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(petResponses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetsResponse> updatePet(
            @PathVariable Long id,
            @RequestParam(required = false) String animalType,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Integer isVaccinated,
            @RequestParam(required = false) Integer isAdopted,
            @RequestParam(required = false) MultipartFile photo) {
        try {
            Pets updatedPet = petsService.updatePet(id, animalType, breed, gender, age, isVaccinated, isAdopted, photo);
            PetsResponse petResponse = convertToResponse(updatedPet);
            return ResponseEntity.ok(petResponse);
        } catch (IOException e) {
            // Handle file upload error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petsService.deletePet(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/animalType/{animalType}")
    public ResponseEntity<PetsResponse> getPetsByAnimalType(@PathVariable String animalType) {
        Pets pet = petsService.getPetsByAnimalType(animalType);
        PetsResponse petResponse = convertToResponse(pet);
        return ResponseEntity.ok(petResponse);
    }

    @GetMapping("/animalTypes")
    public ResponseEntity<List<String>> getAllAnimalTypes() {
        List<String> animalTypes = petsService.getAllAnimalTypes();
        return ResponseEntity.ok(animalTypes);
    }

    @GetMapping("/breed/{breed}")
    public ResponseEntity<PetsResponse> getPetByBreed(@PathVariable String breed) {
        Pets pet = petsService.getPetByBreed(breed);
        PetsResponse petResponse = convertToResponse(pet);
        return ResponseEntity.ok(petResponse);
    }

    @GetMapping("/breeds")
    public ResponseEntity<List<String>> getAllBreeds() {
        List<String> breeds = petsService.getAllBreeds();
        return ResponseEntity.ok(breeds);
    }

    private PetsResponse convertToResponse(Pets pet) {
        PetsResponse response = new PetsResponse();
        response.setId(pet.getId());
        response.setAnimalType(pet.getAnimalType());
        response.setBreed(pet.getBreed());
        response.setGender(pet.getGender());
        response.setAge(pet.getAge());
        response.setIsVaccinated(pet.getIsVaccinated());
        response.setIsAdopted(pet.getIsAdopted());
        response.setPhoto(Base64.encodeBase64String(pet.getPhoto()));
        return response;
    }
}
