package com.fmsproject.pet_adoption.service;

import com.fmsproject.pet_adoption.model.AdoptedPets;

import java.util.List;
import java.util.Optional;

public interface IAdoptionService {
    AdoptedPets addAdoption(AdoptedPets adoptionRequest);

    void deleteAdoption(Long adoptionId);

    // AdoptedPets findByConfirmationCode(String confirmationCode);

    List<AdoptedPets> getAllAdoptions();

    // List<AdoptedPets> getAllAdoptionsByPetId(Long petId);

    // List<AdoptedPets> getAdoptionsByUserEmail(String email);

    Optional<AdoptedPets> getAdoptionById(Long id);
}
