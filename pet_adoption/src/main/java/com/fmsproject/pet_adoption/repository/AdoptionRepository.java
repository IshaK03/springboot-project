package com.fmsproject.pet_adoption.repository;

import com.fmsproject.pet_adoption.model.AdoptedPets;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdoptionRepository extends JpaRepository<AdoptedPets, Long> {

    // Optional<AdoptedPets> findByConfirmationCode(String confirmationCode);

    // List<AdoptedPets> findByAdopterEmail(String email);
}
