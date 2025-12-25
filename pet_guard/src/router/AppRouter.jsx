import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from '../pages/landingpage'
import PetOwnerDashboard from '../pages/petownerhpage';
import ShelterDashboard from '../pages/Shelter/shelterpage';
import BrowseShelters from '../pages/petowner/browseShelter';
import ShelterDetails from '../pages/petowner/shelterDetails';
import PetProfilePage from '../pages/petowner/petProfilepage';
import SearchResultsPage from '../pages/petowner/searchResultpage';
import FavoritesPage from '../pages/petowner/favoritesPages';


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />}></Route>
        <Route path="/pet-owner-dashboard" element={<PetOwnerDashboard />} />
        <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
        <Route path="/browseshelter" element={<BrowseShelters />} />
        <Route path="/shelters/:id" element={<ShelterDetails />} />
        <Route path="/petprofile" element={<PetProfilePage />} />
        <Route path="/searchshelters" element={<SearchResultsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />


    </Routes>
    </BrowserRouter>
  );
}