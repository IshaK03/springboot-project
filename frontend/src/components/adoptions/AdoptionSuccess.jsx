import React from "react";
import { useNavigate } from "react-router-dom";

const AdoptionSuccess = () => {
  const history = useHistory();

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card card-body">
            <h4 className="card-title">Adoption Success!</h4>
            <p>Congratulations! Your adoption request has been successfully submitted.</p>
            <p>We will review your information and get back to you soon.</p>
            <button className="btn btn-primary" onClick={() =>  navigate("/")}>
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionSuccess;
