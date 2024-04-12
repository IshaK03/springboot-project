import React, { useState } from "react";
import '../../index.css'


const PetFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedType = e.target.value;
        setFilter(selectedType);

        const filteredPets = data.filter((pet) =>
            pet.animalType.toLowerCase().includes(selectedType.toLowerCase())
        );
        setFilteredData(filteredPets);
    };

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    };

    const petTypes = ["", ...new Set(data.map((pet) => pet.animalType))];

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="pet-type-filter">
                Filter Pets by Type
            </span>
            <select
                className="form-select"
                aria-label="pet type filter"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value="">Select a pet type to filter...</option>
                {petTypes.map((type, index) => (
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                ))}
            </select>
            <button className="btn btn-pet" type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    );
};

export default PetFilter;
