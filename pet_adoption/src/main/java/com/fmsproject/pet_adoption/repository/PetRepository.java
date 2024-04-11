package com.fmsproject.pet_adoption.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fmsproject.pet_adoption.model.Pets;

public interface PetRepository extends JpaRepository<Pets, Long> {
    Optional<Pets> findByAnimalType(String animalType);

    @Query("SELECT DISTINCT p.animalType FROM Pets p")
    List<String> findAllAnimalTypes();

    Optional<Pets> findByBreed(String breed);

    @Query("SELECT DISTINCT p.breed FROM Pets p")
    List<String> findAllBreeds();

}
