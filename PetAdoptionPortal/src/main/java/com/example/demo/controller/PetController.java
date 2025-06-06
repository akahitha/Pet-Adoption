package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.pet;
import com.example.demo.service.PetService;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to access API
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public List<pet> getPets() {
        return petService.getAllPets();
    }

    @PostMapping
    public pet addPet(@RequestBody pet p) {
        return petService.addPet(p);
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        petService.deletePet(id);
    }
}
