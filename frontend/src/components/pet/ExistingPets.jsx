import React, { useEffect, useState } from "react";
import { deletePet, getAllPets } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import PetFilter from "../common/PetFilter";
import PetPaginator from "../common/PetPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingPets = () => {
    const [pets, setPets] = useState([{ id: "", animalType: "", breed: "", gender: "", age: "", isVaccinated: "", isAdopted: "" }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [petsPerPage] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredPets, setFilteredPets] = useState([{ id: "", animalType: "", breed: "", gender: "", age: "", isVaccinated: "", isAdopted: "" }]);
    const [selectedPetType, setSelectedPetType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        setIsLoading(true);
        try {
            const result = await getAllPets();
            setPets(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedPetType === "") {
            setFilteredPets(pets);
        } else {
            const filteredPets = pets.filter((pet) => pet.animalType === selectedPetType);
            setFilteredPets(filteredPets);
        }
        setCurrentPage(1);
    }, [pets, selectedPetType]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (id) => {
        try {
            const result = await deletePet(id);
            if (result === "") {
                setSuccessMessage(`Pet No ${id} was deleted`);
                fetchPets();
            } else {
                console.error(`Error deleting pet: ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const calculateTotalPages = (filteredPets, petsPerPage, pets) => {
        const totalPets = filteredPets.length > 0 ? filteredPets.length : pets.length;
        return Math.ceil(totalPets / petsPerPage);
    };

    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading Existing Pets</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Pets</h2>
                        </div>
                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <PetFilter data={pets} setFilteredData={setFilteredPets} />
                            </Col>
                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-pet"}>
                                    <FaPlus />Add Pet
                                </Link>
                            </Col>
                        </Row>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Animal Type</th>
                                    <th>Breed</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Vaccinated</th>
                                    <th>Adopted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPets.map((pet) => (
                                    <tr key={pet.id} className="text-center">
                                        <td>{pet.id}</td>
                                        <td>{pet.animalType}</td>
                                        <td>{pet.breed}</td>
                                        <td>{pet.gender}</td>
                                        <td>{pet.age}</td>
                                        <td>{pet.isVaccinated ? "Yes" : "No"}</td>
                                        <td>{pet.isAdopted ? "Yes" : "No"}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-pet/${pet.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDelete(pet.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <PetPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredPets, petsPerPage, pets)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingPets;
