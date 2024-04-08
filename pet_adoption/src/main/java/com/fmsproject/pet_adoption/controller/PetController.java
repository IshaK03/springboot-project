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

    // @PostMapping("/add")
    // public ResponseEntity<PetsResponse> addPet(
    //         @RequestParam("breed") String breed,
    //         @RequestParam("gender") String gender,
    //         @RequestParam("age") int age,
    //         @RequestParam("isVaccinated") boolean isVaccinated,
    //         @RequestParam("isAdopted") boolean isAdopted,
    //         @RequestParam("photo") MultipartFile photo) {
    //     try {
    //         Pets savedPet = petsService.addPet(breed, gender, age, isVaccinated, isAdopted, photo);
    //         PetsResponse petResponse = convertToResponse(savedPet);
    //         return ResponseEntity.ok(petResponse);
    //     } catch (IOException e) {
    //         // Handle file upload error
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //     }
    // }

    @PostMapping("/add")
    public ResponseEntity<PetsResponse> addPet(@ModelAttribute PetsRequest request) {
        try {
            Pets savedPet = petsService.addPet(request.getBreed(), request.getGender(), request.getAge(),
                    request.isVaccinated(), request.isAdopted(), request.getPhoto());
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
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Boolean isVaccinated,
            @RequestParam(required = false) Boolean isAdopted,
            @RequestParam(required = false) MultipartFile photo) {
        try {
            Pets updatedPet = petsService.updatePet(id, breed, gender, age, isVaccinated, isAdopted, photo);
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

    // private PetsResponse convertToResponse(Pets pet) {
    //     // Implement conversion logic from Pets to PetsResponse
    //     PetsResponse response = new PetsResponse();
    //     response.setId(pet.getId());
    //     response.setBreed(pet.getBreed());
    //     response.setGender(pet.getGender());
    //     response.setAge(pet.getAge());
    //     response.setVaccinated(pet.isVaccinated());
    //     response.setAdopted(pet.isAdopted());
    //     // Assuming photo is stored as a Base64 string
    //     response.setPhoto(Base64.encodeBase64String(pet.getPhoto()));
    //     return response;
    // }

    private PetsResponse convertToResponse(Pets pet) {
        PetsResponse response = new PetsResponse();
        response.setId(pet.getId());
        response.setBreed(pet.getBreed());
        response.setGender(pet.getGender());
        response.setAge(pet.getAge());
        response.setVaccinated(pet.isVaccinated());
        response.setAdopted(pet.isAdopted());
        response.setPhoto(Base64.encodeBase64String(pet.getPhoto()));
        return response;
    }
}
