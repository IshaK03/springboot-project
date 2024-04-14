import React, { useState } from "react";
import { addFeedback } from "../utils/ApiFunctions";
import "../../index.css";
import { Link } from "react-router-dom";

const AddFeedback = () => {
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFeedbackInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addFeedback(
        newFeedback.name,
        newFeedback.email,
        newFeedback.phoneNumber,
        newFeedback.comment,
      );

      if (success !== undefined) {
        setSuccessMessage("A new feedback was added to the database");
        setNewFeedback({
            name: "",
            email: "",
            phoneNumber: "",
            comment: "",
        });
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new feedback");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container  mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 px-4 py-4 border border-white rounded-lg">
            <h1 className="mb-2">Add New Feedback</h1>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="name"
                  value={newFeedback.name}
                  onChange={handleFeedbackInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="email"
                  value={newFeedback.email}
                  onChange={handleFeedbackInputChange}
                  placeholder="Enter your E-Mail"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="phoneNumber"
                  value={newFeedback.phoneNumber}
                  onChange={handleFeedbackInputChange}
                  placeholder="Enter your Phone Number"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Feedback
                </label>
                <input
                  className="form-control"
                  required
                  type="text"
                  name="comment"
                  value={newFeedback.comment}
                  onChange={handleFeedbackInputChange}
                  placeholder="Enter your feedback"
                />
              </div>
              <div className="mb-2 row">
                <div className="col-md-3">
                  <Link
                    to="/"
                    className="btn btn-primary form-control col-md-3"
                  >
                    Back
                  </Link>
                </div>
                <div className="col-md-9">
                  <button className="btn btn-pet form-control col-md-6" type="submit">
                    Save Feedback
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddFeedback;
