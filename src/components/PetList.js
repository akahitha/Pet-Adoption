import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPets, deletePet } from "../api";
import "../components/PetList.css";
import EditPet from "./EditPet";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [breedFilter, setBreedFilter] = useState("All");
  const [editingPet, setEditingPet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await getPets();
      console.log("Pets fetched:", response.data);

      // Add default status if missing (for testing)
      const petsWithStatus = response.data.map((pet) => ({
        ...pet,
        status: pet.status || "Available", // default to Available if no status
      }));

      setPets(petsWithStatus);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      await deletePet(id);
      fetchPets();
    }
  };

  const handleUpdatePet = (updatedPet) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    );
    setEditingPet(null);
  };

  // **Add toggleStatus function here**
  const toggleStatus = (id) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === id
          ? { ...pet, status: pet.status === "Available" ? "Adopted" : "Available" }
          : pet
      )
    );
  };

  const uniqueBreeds = ["All", ...new Set(pets.map((p) => p.breed))];

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (breedFilter === "All" || pet.breed === breedFilter)
  );

  // Pagination logic
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Count pets by status for the status display
  const availableCount = pets.filter((p) => p.status === "Available").length;
  const adoptedCount = pets.filter((p) => p.status === "Adopted").length;

  return (
    <div className="pet-list-container">
      <h2>Available Pets for Adoption</h2>

      {!editingPet && (
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
      )}

      {!editingPet && (
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to page 1 on search
            }}
            className="search-input"
          />
          <select
            value={breedFilter}
            onChange={(e) => {
              setBreedFilter(e.target.value);
              setCurrentPage(1); // reset to page 1 on filter change
            }}
            className="breed-select"
          >
            {uniqueBreeds.map((breed, idx) => (
              <option key={idx} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      )}

      {!editingPet && (
        <>
          <div className="status-info">
            Showing {filteredPets.length} of {pets.length} pets
          </div>

          {/* Status summary */}
          <div className="status-summary">
            <strong>Status:</strong>{" "}
            <span>Available: {availableCount}</span> |{" "}
            <span>Adopted: {adoptedCount}</span>
          </div>
        </>
      )}

      {editingPet ? (
        <EditPet
          petData={editingPet}
          onSave={handleUpdatePet}
          onCancel={() => setEditingPet(null)}
        />
      ) : (
        <>
          <table className="pet-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPets.length > 0 ? (
                currentPets.map((pet) => (
                  <tr key={pet.id}>
                    <td>
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="pet-image"
                      />
                    </td>
                    <td>{pet.name}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>
                      {/* Added toggle status button here */}
                      <button
                        className={`status-btn ${
                          (pet.status || "Available").toLowerCase()
                        }`}
                        onClick={() => toggleStatus(pet.id)}
                      >
                        {pet.status || "Available"}
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => setEditingPet(pet)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(pet.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-pets">
                    No matching pets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetList;
