import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPets } from "../utils/ApiFunctions";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const PetCarousel = () => {
    const [pets, setPets] = useState([
        { id: "", age: "", breed: "", animalType: "", gender: "", isVaccinated: 0, isAdopted: 0, photo: "" }
    ]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllPets()
            .then((data) => {
                setPets(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5">Loading pets....</div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    const getPetAge = (months) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        let ageString = "";
        if (years !== 0) {
            ageString = `${years} ${years === 1 ? 'yr' : 'yrs'}`;
        }
        if (remainingMonths !== 0) {
            ageString += ` ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        }

        ageString += " old";
        return ageString;
    };
    
    return (
        <section className="bg-dark mb-5 mt-5 shadow rounded p-2">
            <Link to={"/browse-all-pets"} className="pet-color text-center">
                Browse all pets
            </Link>

            <Container>
                <Carousel indicators={false} >
                    {[...Array(Math.ceil(pets.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {pets.slice(index * 4, index * 4 + 4).map((pet) => (
                                    <Col key={pet.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/edit-pet/${pet.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image;base64, ${pet.photo}`}
                                                    alt="Pet Photo"
                                                    className="w-100"
                                                    style={{ height: "200px" }}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="pet-details">{pet.animalType}</Card.Title>
                                                <Card.Title className="pet-price">{pet.breed}</Card.Title>
                                                <Card.Title className="pet-details">{getPetAge(pet.age)} </Card.Title>
                                                <div className="flex-shrink-0">
                                                    <Link to={`/edit-pet/${pet.id}`} className="btn btn-pet btn-sm">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default PetCarousel;
