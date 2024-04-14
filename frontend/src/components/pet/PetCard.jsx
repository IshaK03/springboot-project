import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const PetCard = ({ pet }) => {

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
    

    const getVaccinationStatus = (vaccinationStatus) => {
        switch (vaccinationStatus) {
            case 0:
                return "No";
            case 1:
                return "Yes";
            case 2:
                return "Partially";
            default:
                return "Unknown";
        }
    };

	return (
		<Col key={pet.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/adopt-pet/${pet.id}`}>
							<Card.Img
								variant="top"
								src={`data:image/png;base64, ${pet.photo}`}
								alt="pet Photo"
								style={{
									width: "300px", // Set fixed width
									height: "200px", // Set fixed height
									objectFit: "cover", // Ensure image covers the specified dimensions
								  }}
								// style={{ width: "100%", maxWidth: "200px", maxHeight: "200px" }}
							/>
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="pet-color">{pet.animalType}</Card.Title>
						<Card.Text>{pet.breed}</Card.Text>
						<Card.Text>Gender: {pet.gender}</Card.Text>
						<Card.Text>Vaccinated: {getVaccinationStatus(pet.isVaccinated)}</Card.Text>
						<Card.Text>Adopted: {pet.isAdopted ? "Yes" : "No"}</Card.Text>
						{/* <Card.Text>Some pet information goes here for the guest to read through</Card.Text> */}
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/adopt-pet/${pet.id}`} className="btn btn-pet btn-sm">
							Adopt Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default PetCard