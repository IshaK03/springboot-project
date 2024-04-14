import React from "react";

const AdoptionSummary = ({ adoptionData }) => {
  return (
    <div className="row">
      <div className="col-md-6"></div>
      <div className="card card-body mt-5">
        <h4 className="card-title">Adoption Summary</h4>
        <p>Name: <strong>{adoptionData.adopterName}</strong></p>
        <p>Email: <strong>{adoptionData.adopterEmail}</strong></p>
        <p>Phone Number: <strong>{adoptionData.adopterPhoneNo}</strong></p>
        <p>Confirmation Code: <strong>{adoptionData.confirmationCode}</strong></p>
        <p>Adoption Date: <strong>{adoptionData.adoptionDate}</strong></p>
      </div>
    </div>
  );
};

export default AdoptionSummary;
