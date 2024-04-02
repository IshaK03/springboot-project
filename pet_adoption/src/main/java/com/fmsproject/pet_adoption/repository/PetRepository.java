package com.fmsproject.pet_adoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fmsproject.pet_adoption.model.Pets;

public interface PetRepository extends JpaRepository<Pets, Long>{

}
