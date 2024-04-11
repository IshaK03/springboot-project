import React, { useState } from "react";
import { addPet } from "../utils/ApiFunctions";
import PetBreedSelector from "../common/PetBreedSelector";
import PetAnimalTypeSelector from "../common/PetAnimalTypeSelector";
import "../../index.css";

const AddPet = () => {
  const [newPet, setNewPet] = useState({
      animalType: "",
      breed: "",
      gender: "",
      age: "",
      isVaccinated: "",
      isAdopted: "",
      photo: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePetInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
};


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewPet({ ...newPet, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mapping isVaccinated and isAdopted values to integers
      let isVaccinatedValue;
      switch(newPet.isVaccinated) {
        case "Not Vaccinated":
          isVaccinatedValue = 0;
          break;
        case "Partially Vaccinated":
          isVaccinatedValue = 1;
          break;
        case "Completely Vaccinated":
          isVaccinatedValue = 2;
          break;
        default:
          isVaccinatedValue = 0; // Default to 0 if none of the cases match
      }

      let isAdoptedValue;
      switch(newPet.isAdopted) {
        case "Not Adopted":
          isAdoptedValue = 0;
          break;
        case "Adopted":
          isAdoptedValue = 1;
          break;
        default:
          isAdoptedValue = 0; // Default to 0 if none of the cases match
      }

      const success = await addPet(
        newPet.animalType,
        newPet.breed,
        newPet.gender,
        newPet.age,
        isVaccinatedValue,
        isAdoptedValue,
        newPet.photo
      );

      if (success !== undefined) {
        setSuccessMessage("A new pet was added to the database");
        setNewPet({
          photo: null,
          animalType: "",
          breed: "",
          gender: "",
          age: "",
          isVaccinated: "Not Vaccinated", // Reset to default value
          isAdopted: "Not Adopted", // Reset to default value
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new pet");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
        setErrorMessage("")
        setSuccessMessage("")
    },3000)
  };


  return (
    <>
      <section className="container  mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 px-4 py-4 border border-white rounded-lg">
            <h1 className="mb-2">Add New Pet</h1>
            {successMessage && (
                <div className="alert alert-success fade show">{successMessage}</div>
            )}
            {errorMessage && (
                <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="animalType" className="form-label">
                  Pet Animal Type
                </label>
                <PetAnimalTypeSelector
                  handlePetInputChange={handlePetInputChange}
                  newPet={newPet}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">
                  Pet Breed
                </label>
                <PetBreedSelector
                  handlePetInputChange={handlePetInputChange}
                  newPet={newPet}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Pet Age (in months)
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="age"
                  value={newPet.age}
                  onChange={handlePetInputChange}
                  placeholder="Pet Age (in months)"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Pet Gender
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="gender"
                  value={newPet.gender}
                  onChange={handlePetInputChange}
                  placeholder="Pet Gender"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="isVaccinated" className="form-label">
                  Pet Vaccination Status
                </label>
                <select
                  className="form-select"
                  name="isVaccinated"
                  value={newPet.isVaccinated}
                  onChange={handlePetInputChange}
                  required
                >
                  <option value="">Select Vaccination Status</option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                  <option value="Partially Vaccinated">Partially Vaccinated</option>
                  <option value="Completely Vaccinated">Completely Vaccinated</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="isAdopted" className="form-label">
                  Pet Adoption Status
                </label>
                <select
                  className="form-select"
                  name="isAdopted"
                  value={newPet.isAdopted}
                  onChange={handlePetInputChange}
                  required
                >
                  <option value="">Select Adoption Status</option>
                  <option value="Not Adopted">Not Adopted</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Pet Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Pet Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px", margin: "0 auto"}}
                    className="mt-3"
                  />
                )}
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className=" btn-pet form-control">
                  Save Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddPet;

