import axios from "axios";

const API_URL = "http://localhost:8080/api/pets";

export const getPets = async () => {
    return await axios.get(API_URL);
};

export const addPet = async (pet) => {
    return await axios.post(API_URL, pet);
};

export const deletePet = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};