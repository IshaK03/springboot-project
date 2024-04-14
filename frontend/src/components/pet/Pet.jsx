import React, { useEffect, useState } from "react";
import { getAllPets } from "../utils/ApiFunctions";
import PetCard from "./PetCard";
import { Col, Container, Row } from "react-bootstrap";
import PetFilter from "../common/PetFilter";
import PetPaginator from "../common/PetPaginator";
import '../../index.css'

const Pet = () => {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [petsPerPage] = useState(3);
    const [filteredPets, setFilteredPets] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllPets()
            .then((data) => {
                setPets(data);
                setFilteredPets(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredPets.length / petsPerPage);

    const renderPets = () => {
        const startIndex = (currentPage - 1) * petsPerPage;
        const endIndex = startIndex + petsPerPage;
        return filteredPets.slice(startIndex, endIndex).map((pet) => (
            <PetCard key={pet.id} pet={pet} />
        ));
    };

    if (isLoading) {
        return <div>Loading pets...</div>;
    }

    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <PetFilter data={pets} setFilteredData={setFilteredPets} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <PetPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderPets()}</Row>
{/* 
            <Row className="mb-5">
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <PetPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row> */}
        </Container>
    );
};

export default Pet;
