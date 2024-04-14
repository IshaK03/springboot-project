import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Welcome to Admin Panel</h2>
            <hr />
            <Link to={"/existing-pets"}>Manage Pets</Link> <br />
            {/* Add more links for managing other resources if needed */}
        </section>
    );
};

export default Admin;
