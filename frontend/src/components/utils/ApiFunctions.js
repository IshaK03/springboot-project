import axios from "axios";

// Create an instance of axios with the base URL of your backend server
export const api = axios.create({
    baseURL: "http://localhost:9192"
});

// Function to add a new pet
export async function addPet(breed, gender, age, isVaccinated, isAdopted, photo) {
    const formData = new FormData();
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("isVaccinated", isVaccinated);
    formData.append("isAdopted", isAdopted);
    formData.append("photo", photo);

    try {
        const response = await api.post("/api/pets/add", formData);
        if (response.status === 201) {
            return true; // Pet added successfully
        } else {
            return false; // Failed to add pet
        }
    } catch (error) {
        console.error("Error adding pet:", error);
        return false; // Failed to add pet
    }
}

// Function to get all pets
export async function getAllPets() {
    try {
        const response = await api.get("/api/pets");
        return response.data; // Array of pets
    } catch (error) {
        console.error("Error getting pets:", error);
        return []; // Return empty array if error occurs
    }
}

// Function to get pet by ID
export async function getPetById(id) {
    try {
        const response = await api.get(`/api/pets/${id}`);
        return response.data; // Single pet object
    } catch (error) {
        console.error(`Error getting pet with ID ${id}:`, error);
        return null; // Return null if error occurs
    }
}

export async function getPetsByBreed(breed) {
    try {
        const response = await api.get(`/api/pets/byBreed/${breed}`);
        return response.data; // Array of pets with the specified breed
    } catch (error) {
        console.error(`Error getting pets with breed ${breed}:`, error);
        return []; // Return empty array if error occurs
    }
}

export async function getAllBreeds() {
    try {
        const response = await api.get("/api/pets/breeds");
        return response.data; // Array of all breeds
    } catch (error) {
        console.error("Error getting all breeds:", error);
        return []; // Return empty array if error occurs
    }
}

// Function to update pet by ID
export async function updatePet(id, breed, gender, age, isVaccinated, isAdopted, photo) {
    const formData = new FormData();
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("isVaccinated", isVaccinated);
    formData.append("isAdopted", isAdopted);
    formData.append("photo", photo);

    try {
        const response = await api.put(`/api/pets/${id}`, formData);
        if (response.status === 200) {
            return true; // Pet updated successfully
        } else {
            return false; // Failed to update pet
        }
    } catch (error) {
        console.error(`Error updating pet with ID ${id}:`, error);
        return false; // Failed to update pet
    }
}

// Function to delete pet by ID
export async function deletePet(id) {
    try {
        const response = await api.delete(`/api/pets/${id}`);
        if (response.status === 204) {
            return true; // Pet deleted successfully
        } else {
            return false; // Failed to delete pet
        }
    } catch (error) {
        console.error(`Error deleting pet with ID ${id}:`, error);
        return false; // Failed to delete pet
    }
}
