import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import { getPetById, updatePet } from "../utils/ApiFunctions";
import PetBreedSelector from "../common/PetBreedSelector";
import PetAnimalTypeSelector from "../common/PetAnimalTypeSelector";
import "../../index.css";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useHistory
  const [pet, setPet] = useState({
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

  useEffect(() => {
    const fetchPet = async () => {
        try {
            const petData = await getPetById(id);
            setPet({
                ...petData,
                isVaccinated: mapVaccinationStatus(petData.isVaccinated),
                isAdopted: mapAdoptionStatus(petData.isAdopted),
            });
            setImagePreview(petData.photo ? `data:${petData.photoType};base64,${petData.photo}` : ""); // Use provided photo type
        } catch (error) {
            console.error(error);
        }
    };
    fetchPet();
}, [id]);



  const handlePetInputChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPet({ ...pet, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mapping isVaccinated and isAdopted values to integers
      let isVaccinatedValue;
      switch (pet.isVaccinated) {
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
      switch (pet.isAdopted) {
        case "Not Adopted":
          isAdoptedValue = 0;
          break;
        case "Adopted":
          isAdoptedValue = 1;
          break;
        default:
          isAdoptedValue = 0; // Default to 0 if none of the cases match
      }

      const success = await updatePet(
        id,
        pet.animalType,
        pet.breed,
        pet.gender,
        pet.age,
        isVaccinatedValue,
        isAdoptedValue,
        pet.photo
      );

      if (success !== undefined) {
        setSuccessMessage("Pet updated successfully!");
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating pet");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const mapVaccinationStatus = (status) => {
    switch (status) {
      case 0:
        return "Not Vaccinated";
      case 1:
        return "Partially Vaccinated";
      case 2:
        return "Completely Vaccinated";
      default:
        return "";
    }
  };

  const mapAdoptionStatus = (status) => {
    switch (status) {
      case 0:
        return "Not Adopted";
      case 1:
        return "Adopted";
      default:
        return "";
    }
  };

  return (
    <>
      <section className="container  mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 px-4 py-4 border border-white rounded-lg">
            <h1 className="mb-2">Edit Pet</h1>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="animalType" className="form-label">
                  Pet Animal Type
                </label>
                <PetAnimalTypeSelector
                  handlePetInputChange={handlePetInputChange}
                  newPet={pet}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">
                  Pet Breed
                </label>
                <PetBreedSelector
                  handlePetInputChange={handlePetInputChange}
                  newPet={pet}
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
                  value={pet.age}
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
                  value={pet.gender}
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
                  value={pet.isVaccinated}
                  onChange={handlePetInputChange}
                  required
                >
                  <option value="">Select Vaccination Status</option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                  <option value="Partially Vaccinated">
                    Partially Vaccinated
                  </option>
                  <option value="Completely Vaccinated">
                    Completely Vaccinated
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="isAdopted" className="form-label">
                  Pet Adoption Status
                </label>
                <select
                  className="form-select"
                  name="isAdopted"
                  value={pet.isAdopted}
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
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      margin: "0 auto",
                    }}
                    className="mt-3"
                  />
                )}
              </div>
              <div className="mb-3 row">
                <div className="col-md-3">
                  <button className="btn btn-primary form-control" onClick={() => navigate("/existing-pets")}>Back</button>
                </div>
                <div className="col-md-9">
                  <button className="btn btn-pet form-control" type="submit">Save Pet</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditPet;
