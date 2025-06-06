import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { addPet } from "../api";
import './AddPet.css';

const AddPet = ({ onPetAdded }) => {
  const [pet, setPet] = useState({ name: "", breed: "", age: "", imageUrl: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert age to number
    const petData = { ...pet, age: Number(pet.age) };

    try {
      await addPet(petData);
      onPetAdded();
      setPet({ name: "", breed: "", age: "", imageUrl: "" });
      navigate("/pet-list");
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet. Please check your input values.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="form-group">
          <label htmlFor="name">Pet Name</label>
          <input
            id="name"
            name="name"
            value={pet.name}
            onChange={handleChange}
            placeholder="Pet Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            id="breed"
            name="breed"
            value={pet.breed}
            onChange={handleChange}
            placeholder="Breed"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            min="0"
            value={pet.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={pet.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
