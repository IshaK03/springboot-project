// // package com.fmsproject.pet_adoption.controller;

// // import com.fmsproject.pet_adoption.model.Pets;
// // import com.fmsproject.pet_adoption.response.PetsResponse;
// // import com.fmsproject.pet_adoption.service.IPetService;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.HttpStatus;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.web.bind.annotation.*;
// // import org.springframework.web.multipart.MultipartFile;

// // import java.util.List;
// // import java.util.stream.Collectors;

// // @RestController
// // @RequestMapping("/api/pets")
// // public class PetController {

// //     @Autowired
// //     private IPetService petsService;

// //     @PostMapping
// //     public ResponseEntity<Pets> addPet(@ModelAttribute Pets pet, @RequestParam("photo") MultipartFile photo) {
// //         Pets savedPet = petsService.addPet(pet, photo);
// //         return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
// //     }

// //     @GetMapping("/{id}")
// //     public ResponseEntity<PetsResponse> getPetById(@PathVariable Long id) {
// //         Pets pet = petsService.getPetById(id);
// //         PetsResponse petResponse = convertToResponse(pet);
// //         return ResponseEntity.ok(petResponse);
// //     }

// //     @GetMapping
// //     public ResponseEntity<List<PetsResponse>> getAllPets() {
// //         List<Pets> pets = petsService.getAllPets();
// //         List<PetsResponse> petResponses = pets.stream()
// //                 .map(this::convertToResponse)
// //                 .collect(Collectors.toList());
// //         return ResponseEntity.ok(petResponses);
// //     }

// //     @PutMapping("/{id}")
// //     public ResponseEntity<Pets> updatePet(@PathVariable Long id, @RequestBody Pets pet) {
// //         Pets updatedPet = petsService.updatePet(id, pet);
// //         return ResponseEntity.ok(updatedPet);
// //     }

// //     @DeleteMapping("/{id}")
// //     public ResponseEntity<Void> deletePet(@PathVariable Long id) {
// //         petsService.deletePet(id);
// //         return ResponseEntity.noContent().build();
// //     }

// //     private PetsResponse convertToResponse(Pets pet) {
// //         return new PetsResponse(
// //                 pet.getId(),
// //                 pet.getBreed(),
// //                 pet.getGender(),
// //                 pet.getAge(),
// //                 pet.isVaccinated(),
// //                 pet.isAdopted());
// //     }
// // }

// // PetController.java
// package com.fmsproject.pet_adoption.controller;

// import com.fmsproject.pet_adoption.model.Pets;
// import com.fmsproject.pet_adoption.response.PetsResponse;
// import com.fmsproject.pet_adoption.service.IPetService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.util.List;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/pets")
// public class PetController {

//     @Autowired
//     private IPetService petsService;

//     @PostMapping
//     public ResponseEntity<Pets> addPet(@ModelAttribute Pets pet, @RequestParam("photo") MultipartFile photo) {
//         // Handle file upload and set photo data in the pet object
//         try {
//             pet.setPhoto(photo.getBytes());
//         } catch (IOException e) {
//             throw new RuntimeException("Error uploading pet photo", e);
//         }
        
//         // Save the pet
//         Pets savedPet = petsService.addPet(pet);
        
//         return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<PetsResponse> getPetById(@PathVariable Long id) {
//         Pets pet = petsService.getPetById(id);
//         PetsResponse petResponse = convertToResponse(pet);
//         return ResponseEntity.ok(petResponse);
//     }

//     @GetMapping
//     public ResponseEntity<List<PetsResponse>> getAllPets() {
//         List<Pets> pets = petsService.getAllPets();
//         List<PetsResponse> petResponses = pets.stream()
//                 .map(this::convertToResponse)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(petResponses);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Pets> updatePet(@PathVariable Long id, @RequestBody Pets pet) {
//         Pets updatedPet = petsService.updatePet(id, pet);
//         return ResponseEntity.ok(updatedPet);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deletePet(@PathVariable Long id) {
//         petsService.deletePet(id);
//         return ResponseEntity.noContent().build();
//     }

//     private PetsResponse convertToResponse(Pets pet) {
//         return new PetsResponse(
//                 pet.getId(),
//                 pet.getBreed(),
//                 pet.getGender(),
//                 pet.getAge(),
//                 pet.isVaccinated(),
//                 pet.isAdopted(),
//                 pet.getPhoto());
//     }
// }

package com.fmsproject.pet_adoption.controller;

import com.fmsproject.pet_adoption.model.Pets;
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
public class PetController {

    @Autowired
    private IPetService petsService;

    @PostMapping("/add")
    public ResponseEntity<PetsResponse> addPet(
            @RequestParam("breed") String breed,
            @RequestParam("gender") String gender,
            @RequestParam("age") int age,
            @RequestParam("isVaccinated") boolean isVaccinated,
            @RequestParam("isAdopted") boolean isAdopted,
            @RequestParam("photo") MultipartFile photo) {
        try {
            Pets savedPet = petsService.addPet(breed, gender, age, isVaccinated, isAdopted, photo);
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

    private PetsResponse convertToResponse(Pets pet) {
        // Implement conversion logic from Pets to PetsResponse
        PetsResponse response = new PetsResponse();
        response.setId(pet.getId());
        response.setBreed(pet.getBreed());
        response.setGender(pet.getGender());
        response.setAge(pet.getAge());
        response.setVaccinated(pet.isVaccinated());
        response.setAdopted(pet.isAdopted());
        // Assuming photo is stored as a Base64 string
        response.setPhoto(Base64.encodeBase64String(pet.getPhoto()));
        return response;
    }
}

