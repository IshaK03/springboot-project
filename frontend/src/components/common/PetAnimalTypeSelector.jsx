import React, { useEffect, useState } from 'react'
import '../../index.css'
import { getAllAnimalTypes } from '../utils/ApiFunctions';

// import AddPet from '../pet/AddPet'

const PetAnimalTypeSelector = ({handlePetInputChange, newPet}) => {
    const[petAnimalTypes, setPetAnimalTypes] = useState([""])
    const[showNewPetAnimalTypeInput, setShowNewPetAnimalTypeInput] = useState(false)
    const[newPetAnimalType, setNewPetAnimalType] = useState("")

    useEffect(() => {
        getAllAnimalTypes().then((data) => {
            setPetAnimalTypes(data)
        })
    }, [])

    const handleNewPetAnimalTypeInputChange = (e) => {
        setNewPetAnimalType(e.target.value)
    }

    // const handleAddNewPetAnimalType = () => {
    //     if(newPetAnimalType !== ""){
    //         setPetAnimalTypes([...petAnimalTypes, newPetAnimalType])
    //         setNewPetAnimalType("")
    //         setShowNewPetAnimalTypeInput(false)
    //     }
    // }

    const handleAddNewPetAnimalType = () => {
        if(newPetAnimalType !== ""){
            setPetAnimalTypes([...petAnimalTypes, newPetAnimalType]);
            setNewPetAnimalType("");
            setShowNewPetAnimalTypeInput(false);
            // Update newPet.animalType state to reflect the newly added type
            const event = {
                target: {
                    name: "animalType",
                    value: newPetAnimalType
                }
            };
            handlePetInputChange(event);
        }
    };
    
  return (
    <>
    {petAnimalTypes.length >= 0 && (
        <div>
            <select 
            name="animalType"
            id="animalType"
            className='form-select'
            value={newPet.animalType}
            onChange={(e) => {
                if(e.target.value == "Add New Animal Type"){
                    setShowNewPetAnimalTypeInput(true)
                }else{
                    handlePetInputChange(e)
                }
            }}
            >
                <option value={""}>Select Pet Animal Type</option>
                <option value={"Add New Animal Type"}>Add New Animal Type</option>
                {petAnimalTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {showNewPetAnimalTypeInput && (
                <div className='input-group mt-4'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter New Pet Animal Type'
                        onChange={handleNewPetAnimalTypeInputChange}
                    />
                    <button style={{ backgroundColor: 'rgb(169, 77, 123)', color: '#fff' }} className='btn' onClick={handleAddNewPetAnimalType}>
                        Add
                    </button>
                </div>
            )}
        </div>
    )}
    </>
  )
}

export default PetAnimalTypeSelector