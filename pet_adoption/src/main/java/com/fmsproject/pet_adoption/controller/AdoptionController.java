package com.fmsproject.pet_adoption.controller;

import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
import com.fmsproject.pet_adoption.model.AdoptedPets;
import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.response.AdoptionRequest;
import com.fmsproject.pet_adoption.response.AdoptionResponse;
import com.fmsproject.pet_adoption.service.AdoptionService;
import com.fmsproject.pet_adoption.service.IAdoptionService;
import com.fmsproject.pet_adoption.service.IPetService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

// @RequiredArgsConstructor
@RequiredArgsConstructor
@RestController
@RequestMapping("/adoptions")
@CrossOrigin(origins = "http://localhost:5173")
public class AdoptionController {
    private final IAdoptionService adoptionService;
    private final IPetService petService;

    @GetMapping("/all-adoptions")
    public ResponseEntity<List<AdoptionResponse>> getAllAdoptions() {
        List<AdoptedPets> adoptedPetsList = adoptionService.getAllAdoptions();
        List<AdoptionResponse> adoptionResponses = new ArrayList<>();
        for (AdoptedPets adoptedPets : adoptedPetsList) {
            AdoptionResponse adoptionResponse = getAdoptionResponse(adoptedPets);
            adoptionResponses.add(adoptionResponse);
        }
        return ResponseEntity.ok(adoptionResponses);
    }

    @PostMapping("/add")
    public ResponseEntity<AdoptionResponse> addAdoption(@RequestBody AdoptionRequest adoptionRequest) {
        // Retrieve parameters from the adoption request object
        Long petId = adoptionRequest.getId();
        String adopterName = adoptionRequest.getAdopterName();
        String adopterEmail = adoptionRequest.getAdopterEmail();
        Long adopterPhoneNo = adoptionRequest.getAdopterPhoneNo();
        String confirmationCode = adoptionRequest.getConfirmationCode();
        LocalDate adoptionDate = adoptionRequest.getAdoptionDate();

        // Fetch the Pets entity using the petId from the adoptionRequest
        System.out.println("ID before findById: " + petId);
        // Pets pet = petService.getPetById(petId);
        // if (pet == null) {
        // throw new ResourceNotFoundException("Pet with id " + petId + " not found");
        // }

        Pets pet = null;
        try {
            // Fetch the Pets entity using the petId from the adoptionRequest
            System.out.println("ID before findById: " + petId);
            pet = petService.getPetById(petId);
            if (pet == null) {
                throw new ResourceNotFoundException("Pet with id " + petId + " not found");
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a specific error response to the client
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching the pet with ID: " + petId);
        }
        // Create an AdoptedPets object with the parameters received
        AdoptedPets adoptedPet = new AdoptedPets();
        adoptedPet.setAdopterName(adopterName);
        adoptedPet.setAdopterEmail(adopterEmail);
        adoptedPet.setAdopterPhoneNo(adopterPhoneNo);
        adoptedPet.setConfirmationCode(confirmationCode);
        adoptedPet.setAdoptionDate(adoptionDate);

        // Set the pet property of the adoptedPet object
        adoptedPet.setPet(pet);

        // Pass the adoptedPet object to the service method
        AdoptedPets savedAdoptedPet = adoptionService.addAdoption(adoptedPet);

        // Create an AdoptionResponse based on the saved adoption details
        AdoptionResponse adoptionResponse = new AdoptionResponse(
                savedAdoptedPet.getId(),
                savedAdoptedPet.getAdopterName(),
                savedAdoptedPet.getAdopterEmail(),
                savedAdoptedPet.getAdopterPhoneNo(),
                savedAdoptedPet.getConfirmationCode(),
                savedAdoptedPet.getAdoptionDate(),
                savedAdoptedPet.getPet() // Assuming you have a getter for the pet in AdoptedPets
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(adoptionResponse);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/generate-confirmation-code")
    public ResponseEntity<String> generateConfirmationCode() {
        // Generate and return a confirmation code
        String confirmationCode = generateRandomConfirmationCode();
        return ResponseEntity.ok(confirmationCode);
    }

    private String generateRandomConfirmationCode() {
        // You can customize this method to generate a confirmation code based on your
        // requirements
        // For example, you can combine attributes like pet ID, adopter's email, and
        // current timestamp
        // Here's a simple example using UUID
        return UUID.randomUUID().toString();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionResponse> getAdoptionById(@PathVariable Long id) {
        AdoptedPets adoptedPets = adoptionService.getAdoptionById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption not found with id: " + id));
        AdoptionResponse adoptionResponse = getAdoptionResponse(adoptedPets);
        return ResponseEntity.ok(adoptionResponse);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteAdoption(@PathVariable Long id) {
        adoptionService.deleteAdoption(id);
        return ResponseEntity.ok("Adoption with id " + id + " deleted successfully");
    }

    private AdoptionResponse getAdoptionResponse(AdoptedPets adoptedPets) {
        return new AdoptionResponse(
                adoptedPets.getId(),
                adoptedPets.getAdopterName(),
                adoptedPets.getAdopterEmail(),
                adoptedPets.getAdopterPhoneNo(),
                adoptedPets.getConfirmationCode(),
                adoptedPets.getAdoptionDate(),
                adoptedPets.getPet());
    }
}
