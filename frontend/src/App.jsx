import './App.css'
import AddPet from './components/pet/AddPet'
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import ExistingPets from './components/pet/ExistingPets.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPet from './components/pet/EditPet.jsx';
import Home from './components/home/Home.jsx';
// import NavBar from './components/layout/NavBar.jsx';
import Footer from './components/layout/Footer.jsx';
import PetListing from './components/pet/PetListing.jsx';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/existing-pets" element={<ExistingPets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/browse-all-pets" element={<PetListing />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
