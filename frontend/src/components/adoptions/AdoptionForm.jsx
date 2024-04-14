import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addAdoption, generateConfirmationCode } from "../utils/ApiFunctions";
import AdoptionSummary from "./AdoptionSummary";

const AdoptionForm = ({ Id }) => {
    console.log("Received Id:", Id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [adoptionData, setAdoptionData] = useState({
    id: Id,
    adopterName: "",
    adopterEmail: "",
    adopterPhoneNo: "",
    confirmationCode: "",
    adoptionDate: new Date().toISOString().slice(0, 10)
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptionData({ ...adoptionData, [name]: value });
    setErrorMessage("");
  };

  const handleGenerateConfirmationCode = async () => {
    try {
      const code = await generateConfirmationCode();
      setAdoptionData({ ...adoptionData, confirmationCode: code });
    } catch (error) {
      setErrorMessage("Failed to generate confirmation code");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addAdoption(adoptionData);
      if (success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage("Failed to submit adoption form");
      }
    } catch (error) {
      console.error("Error submitting adoption form:", error);
      setErrorMessage("Failed to submit adoption form");
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      navigate("/adoption-success");
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2>Adoption Form</h2>
          {isSubmitted ? (
            <AdoptionSummary adoptionData={adoptionData} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="adopterName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="adopterName"
                  value={adoptionData.adopterName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="adopterEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  name="adopterEmail"
                  value={adoptionData.adopterEmail}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="adopterPhoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="adopterPhoneNo"
                  value={adoptionData.adopterPhoneNo}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              {/* <Button className="mr-2" variant="primary" onClick={handleGenerateConfirmationCode}>
                Generate Confirmation Code
              </Button> */}
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
              {errorMessage && (
                <div className="text-danger mt-3">{errorMessage}</div>
              )}
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
