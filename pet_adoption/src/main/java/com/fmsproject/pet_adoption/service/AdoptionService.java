// package com.fmsproject.pet_adoption.service;

// import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
// import com.fmsproject.pet_adoption.model.AdoptedPets;
// import com.fmsproject.pet_adoption.model.Pets;
// import com.fmsproject.pet_adoption.repository.AdoptionRepository;
// import com.fmsproject.pet_adoption.repository.PetRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// @RequiredArgsConstructor
// public class AdoptionService implements IAdoptionService {
//     private final AdoptionRepository adoptionRepository;
//     private final PetRepository petRepository;

//     @Override
//     public AdoptedPets addAdoption(AdoptedPets adoptionRequest) {
//         Pets pet = petRepository.findById(adoptionRequest.getPetId())
//                 .orElseThrow(() -> new ResourceNotFoundException(
//                         "Pet with id " + adoptionRequest.getPetId() + " not found"));

//         // Set pet details in adoption request
//         adoptionRequest.setPet(pet);

//         // Save adoption
//         return adoptionRepository.save(adoptionRequest);
//     }

//     @Override
//     public Optional<AdoptedPets> getAdoptionById(Long id) {
//         return adoptionRepository.findById(id);
//     }

//     @Override
//     public void deleteAdoption(Long adoptionId) {
//         adoptionRepository.deleteById(adoptionId);
//     }

//     // @Override
//     // public AdoptedPets findByConfirmationCode(String confirmationCode) {
//     //     return adoptionRepository.findByConfirmationCode(confirmationCode)
//     //             .orElseThrow(() -> new ResourceNotFoundException(
//     //                     "Adoption with confirmation code " + confirmationCode + " not found"));
//     // }

//     @Override
//     public List<AdoptedPets> getAllAdoptions() {
//         return adoptionRepository.findAll();
//     }

//     // @Override
//     // public List<AdoptedPets> getAdoptionsByUserEmail(String email) {
//     // return adoptionRepository.findByAdopterEmail(email);
//     // }
// }

package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.exception.ResourceNotFoundException;
import com.fmsproject.pet_adoption.model.AdoptedPets;
import com.fmsproject.pet_adoption.model.Pets;
import com.fmsproject.pet_adoption.repository.AdoptionRepository;
import com.fmsproject.pet_adoption.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdoptionService implements IAdoptionService {
    private final AdoptionRepository adoptionRepository;
    private final PetRepository petRepository;

    @Override
    public AdoptedPets addAdoption(AdoptedPets adoptionRequest) {
        Pets pet = petRepository.findById(adoptionRequest.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Pet with id " + adoptionRequest.getId() + " not found"));

        adoptionRequest.setPet(pet);

        return adoptionRepository.save(adoptionRequest);
    }

    @Override
    public Optional<AdoptedPets> getAdoptionById(Long id) {
        return adoptionRepository.findById(id);
    }

    @Override
    public void deleteAdoption(Long adoptionId) {
        adoptionRepository.deleteById(adoptionId);
    }

    @Override
    public List<AdoptedPets> getAllAdoptions() {
        return adoptionRepository.findAll();
    }
}
