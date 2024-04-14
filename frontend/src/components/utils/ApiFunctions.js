  import axios from "axios";

  // Create an instance of axios with the base URL of your backend server
  export const api = axios.create({
    baseURL: "http://localhost:9192",
  });

  // Function to add a new pet
  export async function addPet(
    animalType,
    breed,
    gender,
    age,
    isVaccinated,
    isAdopted,
    photo
  ) {
    const formData = new FormData();
    formData.append("animalType", animalType);
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("isVaccinated", isVaccinated);
    formData.append("isAdopted", isAdopted);
    formData.append("photo", photo);

    console.log("isVaccinated:", isVaccinated);
    console.log("isAdopted:", isAdopted);

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

  export async function getAllAnimalTypes() {
    try {
      const response = await api.get("/api/pets/animalTypes");
      return response.data; // Array of all AnimalTypes
    } catch (error) {
      console.error("Error getting all AnimalTypes:", error);
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

  // Function to get all pets
  export async function getAllPets() {
    try {
      const response = await api.get("/api/pets/all-pets");
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

  export async function getPetsByAnimalType(animalType) {
    try {
      const response = await api.get(`/api/pets/byAnimalType/${animalType}`);
      return response.data; // Array of pets with the specified AnimalType
    } catch (error) {
      console.error(`Error getting pets with AnimalType ${animalType}:`, error);
      return []; // Return empty array if error occurs
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

  // Function to update pet by ID
  export async function updatePet(
    id,
    animalType,
    breed,
    gender,
    age,
    isVaccinated,
    isAdopted,
    photo
  ) {
    const formData = new FormData();
    formData.append("animalType", animalType);
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

  // // Function to delete pet by ID
  // export async function deletePet(id) {
  //   try {
  //     const response = await api.delete(`/api/pets/${id}`);
  //     if (response.status === 204) { 
  //       return true; // Pet deleted successfully
  //     } else {
  //       return false; // Failed to delete pet
  //     }
  //   } catch (error) {
  //     console.error(`Error deleting pet with ID ${id}:`, error);
  //     return false; // Failed to delete pet
  //   }
  // }

  export async function deletePet(id){
      try {
          const result = await api.delete(`/api/pets/delete/${id}`);
          return result.data
      } catch (error) {
          throw new Error(`Error deleting Pet ${error.message}`)
      }
  }


  // export async function addAdoption(petId, adopterName, adopterEmail, adopterPhoneNo) {
  //   const formData = new FormData();
  //   formData.append("petId", petId);
  //   formData.append("adoptionDate", adopterDate);
  //   formData.append("adopterName", adopterName);
  //   formData.append("adopterEmail", adopterEmail);
  //   formData.append("adopterPhoneNo", adopterPhoneNo);
  //   formData.append("confirmationCode", confirmationCode);
  
  //   try {
  //     const response = await api.post("/adoptions/add", formData);
  //     if (response.status === 201) {
  //       return true; // Adoption added successfully
  //     } else {
  //       return false; // Failed to add adoption
  //     }
  //   } catch (error) {
  //     console.error("Error adding adoption:", error);
  //     return false; // Failed to add adoption
  //   }
  // }
  
  // export async function generateConfirmationCode(petId) {
  //   try {
  //     const response = await api.post("/adoptions/generate-confirmation-code", { petId });
  //     if (response.status === 200) {
  //       return response.data; // Confirmation code generated successfully
  //     } else {
  //       throw new Error("Failed to generate confirmation code");
  //     }
  //   } catch (error) {
  //     console.error("Error generating confirmation code:", error);
  //     throw error;
  //   }
  // }

  export async function addAdoption(adoptionData) {
    const { id, adopterName, adopterEmail, adopterPhoneNo, confirmationCode, adoptionDate } = adoptionData;
    try {
      // Make a POST request to the '/add' endpoint with the adoption details
      // const response = await api.post("/adoptions/add", {
      //   id,
      //   adopterName,
      //   adopterEmail,
      //   adopterPhoneNo,
      //   confirmationCode,
      //   adoptionDate,
      // });
      // Return the response data, which should contain the adoption details
      return true;
    } catch (error) {
      // Handle any errors
      console.error("Error adding adoption:", error);
      throw error;
    }
  }
  
  // Function to generate confirmation code
  export async function generateConfirmationCode() {
    try {
      // Make a GET request to the '/generate-confirmation-code' endpoint
      const response = await api.get(`/adoptions/generate-confirmation-code`);
      // Return the generated confirmation code
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error generating confirmation code:", error);
      throw error;
    }
  }
  
  
  export async function getAllAdoptions() {
    try {
      const response = await api.get("/adoptions/all-adoptions");
      return response.data; // Array of adoptions
    } catch (error) {
      console.error("Error getting adoptions:", error);
      return []; // Return empty array if error occurs
    }
  }
  
  export async function getAdoptionById(id) {
    try {
      const response = await api.get(`/adoptions/${id}`);
      return response.data; // Single adoption object
    } catch (error) {
      console.error(`Error getting adoption with ID ${id}:`, error);
      return null; // Return null if error occurs
    }
  }
  
  export async function deleteAdoption(id) {
    try {
      const response = await api.delete(`/adoptions/${id}/delete`);
      if (response.status === 200) {
        return true; // Adoption deleted successfully
      } else {
        return false; // Failed to delete adoption
      }
    } catch (error) {
      console.error(`Error deleting adoption with ID ${id}:`, error);
      return false; // Failed to delete adoption
    }
  }