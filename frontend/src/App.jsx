import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './index.css';
import ExistingPets from './components/pet/ExistingPets.jsx';
import AddPet from './components/pet/AddPet'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPet from './components/pet/EditPet.jsx';
import Home from './components/home/Home.jsx';
import Footer from './components/layout/Footer.jsx';
import PetListing from './components/pet/PetListing.jsx';
import Admin from './components/admin/Admin.jsx';
import Checkout from './components/adoptions/Checkout.jsx';
import AdoptionSuccess from './components/adoptions/AdoptionSuccess.jsx';
import AddFeedback from './components/feedback/AddFeedback.jsx';
import FeedbackListing from './components/feedback/FeedbackListing.jsx';
// import Navbar from './components/layout/Navbar.jsx';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-pet/:id" element={<EditPet />} />
        <Route path="/adopt-pet/:id" element={<Checkout />} />
        <Route path="/adoption-success" element={<AdoptionSuccess />} />
        <Route path="/existing-pets" element={<ExistingPets />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/browse-all-pets" element={<PetListing />} />
        <Route path="/browse-all-feedback" element={<FeedbackListing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
