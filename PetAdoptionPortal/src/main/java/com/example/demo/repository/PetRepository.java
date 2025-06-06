package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.pet;

@Repository
public interface PetRepository extends JpaRepository<pet, Long> {
}
