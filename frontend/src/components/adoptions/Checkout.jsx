import React from 'react';
import { useParams } from 'react-router-dom';
import AdoptionForm from './AdoptionForm';

const Checkout = () => {
  // Accessing the id parameter from the URL using useParams hook
  const { id } = useParams(); 
  console.log("Pet ID:", id);

  return (
    <div>
      <AdoptionForm Id={id} />
    </div>
  );
};

export default Checkout;
