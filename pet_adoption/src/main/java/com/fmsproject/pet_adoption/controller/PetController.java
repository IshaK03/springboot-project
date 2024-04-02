package com.fmsproject.pet_adoption.controller;

import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.response.PetsResponse;
import com.fmsproject.pet_adoption.service.IPetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private IPetService petsService;

    @PostMapping
    public ResponseEntity<Pets> addPet(@RequestBody Pets pet) {
        Pets savedPet = petsService.addPet(pet);
        return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
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
    public ResponseEntity<Pets> updatePet(@PathVariable Long id, @RequestBody Pets pet) {
        Pets updatedPet = petsService.updatePet(id, pet);
        return ResponseEntity.ok(updatedPet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petsService.deletePet(id);
        return ResponseEntity.noContent().build();
    }

    private PetsResponse convertToResponse(Pets pet) {
    try {
        return new PetsResponse(
                pet.getId(),
                pet.getBreed(),
                pet.getGender(),
                pet.getAge(),
                pet.isVaccinated(),
                pet.isAdopted(),
                pet.getPhoto() != null ? pet.getPhoto().getBytes(1, (int) pet.getPhoto().length()) : null
        );
    } catch (SQLException e) {
        throw new RuntimeException("Error converting pet to response", e);
    }
}

}
