import React, { useState } from 'react'
import { addPet } from '../utils/ApiFunctions'
import PetBreedSelector from '../common/PetBreedSelector'
import '../../index.css';


const AddPet = () => {
    const [newPet, setNewPet] = useState({
        photo: null,
        breed: "",
        gender: "",
        age: "",
        isVaccinated: "",
        isAdopted: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handlePetInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if(name == "age"){
            if(!isNaN(value)){
                value = parseInt(value)
            }else{
                value = ""
            }
        }
        setNewPet({...newPet, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewPet({...newPet, ["photo"]: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const success = await addPet(newPet.breed, newPet.gender, newPet.age, newPet.isVaccinated, newPet.isAdopted, newPet.photo)
            if(success !== undefined){
                setSuccessMessage("A new pet was added to the database")
                setNewPet({
                    photo: null,
                    breed: "",
                    gender: "",
                    age: "",
                    isVaccinated: "",
                    isAdopted: ""
                })
                setImagePreview("")
                setErrorMessage("")
            }else{
                setErrorMessage("Error adding new pet")
            }
        }catch(error){
            setErrorMessage(error.message)
        }
    }
  return (
    <>
    <section className='container, mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h1 className='mt-5 mb-2'>Add New Pet</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='breed' className='form-label'>
                            Pet Breed (Specify Animal)
                        </label>
                        {/* <input 
                            className='form-control'
                            required
                            type='text'
                            id = "breed"
                            name = "breed"
                            value = {newPet.breed}
                            onChange={handlePetInputChange}
                        /> */}
                        <div>
                            <PetBreedSelector
                                handlePetInputChange={handlePetInputChange}
                                newPet={newPet}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='age' className='form-label'>
                            Pet Age (in months)
                        </label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            id = "age"
                            name = "age"
                            value = {newPet.age}
                            onChange={handlePetInputChange}
                        />
                        <div></div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='gender' className='form-label'>
                            Pet Gender
                        </label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            id = "gender"
                            name = "gender"
                            value = {newPet.gender}
                            onChange={handlePetInputChange}
                        />
                        <div></div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='isVaccinated' className='form-label'>
                            Pet Vaccination Status
                        </label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            id = "isVaccinated"
                            name = "isVaccinated"
                            value = {newPet.isVaccinated}
                            onChange={handlePetInputChange}
                        />
                        <div></div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='isAdopted' className='form-label'>
                            Pet Adoption Status
                        </label>
                        <input 
                            className='form-control'
                            required
                            type='text'
                            id = "isAdopted"
                            name = "isAdopted"
                            value = {newPet.isAdopted}
                            onChange={handlePetInputChange}
                        />
                        <div></div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'>
                            Pet Photo
                        </label>
                        <input
                            id='photo'
                            name='photo'
                            type='file'            
                            className='form-control'
                            onChange={handleImageChange}           
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview Pet Photo"
                                style={{maxWidth: "400px", maxHeight: "400px"}}
                                className='mb-3'
                            />
                        )}
                    </div>
                    <div className='d-grid d-md-flex mt-2'>
                        <button className='btn-pet btn-outline-primary ml-5 form-control '>
                            Save Pet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default AddPet