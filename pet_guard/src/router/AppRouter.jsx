import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from '../pages/landingpage'
import PetOwnerDashboard from '../pages/petownerhpage';
import ShelterDashboard from '../pages/Shelter/shelterpage';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />}></Route>
        <Route path="/pet-owner-dashboard" element={<PetOwnerDashboard />} />
        <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
       

    </Routes>
    </BrowserRouter>
  );
}