import React, { useEffect, useState } from 'react'
import { getPetsByBreed } from '../utils/ApiFunctions'
import '../../index.css'
import { getAllBreeds } from '../utils/ApiFunctions';

// import AddPet from '../pet/AddPet'

const PetBreedSelector = ({handlePetInputChange, newPet}) => {
    const[petBreeds, setPetBreeds] = useState([""])
    const[showNewPetBreedInput, setShowNewPetBreedInput] = useState(false)
    const[newPetBreed, setNewPetBreed] = useState("")

    useEffect(() => {
        getAllBreeds().then((data) => {
            setPetBreeds(data)
        })
    }, [])

    const handleNewPetBreedInputChange = (e) => {
        setNewPetBreed(e.target.value)
    }

    const handleAddNewPetBreed = () => {
        if(newPetBreed !== ""){
            setPetBreeds([...petBreeds, newPetBreed])
            setNewPetBreed("")
            setShowNewPetBreedInput(false)
        }
    }
  return (
    <>
    {petBreeds.length >= 0 && (
        <div>
            <select 
            name="breed"
            id="breed"
            className='form-select'
            value={newPet.breed}
            onChange={(e) => {
                if(e.target.value == "Add New Breed"){
                    setShowNewPetBreedInput(true)
                }else{
                    handlePetInputChange(e)
                }
            }}
            >
                <option value={""}>Select Pet Breed</option>
                <option value={"Add New Breed"}>Add New Breed</option>
                {petBreeds.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {showNewPetBreedInput && (
                <div className='input-group mt-4'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Enter New Pet Breed'
                        onChange={handleNewPetBreedInputChange}
                    />
                    <button style={{ backgroundColor: 'rgb(169, 77, 123)', color: '#fff' }} className='btn' onClick={handleAddNewPetBreed}>
                        Add
                    </button>
                </div>
            )}
        </div>
    )}
    </>
  )
}

export default PetBreedSelector