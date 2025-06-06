package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.pet;
import com.example.demo.repository.PetRepository;

import java.util.List;

@Service
public class PetService {
    @Autowired
    private PetRepository petRepository;

    public List<pet> getAllPets() {
        return petRepository.findAll();
    }

    public pet addPet(pet p) {
        return petRepository.save(p);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
