import React, { useState } from "react";
import "./EditPet.css"; // reuse your existing form styles if you want

const EditPet = ({ petData, onSave, onCancel }) => {
  const [pet, setPet] = useState(petData);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pet); // Save updated pet to parent state
  };

  return (
    <div className="form-container">
      <h2>Edit Pet</h2>
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
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn" style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPet;
