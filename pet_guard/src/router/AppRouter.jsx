import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from '../pages/landingpage'
import PetOwnerDashboard from '../pages/petownerhpage';
import ShelterDashboard from '../pages/Shelter/shelterpage';
import BrowseShelters from '../pages/petowner/browseShelter';
import ShelterDetails from '../pages/petowner/shelterDetails';
import PetProfilePage from '../pages/petowner/petProfilepage';
import SearchResultsPage from '../pages/petowner/searchResultpage';
import FavoritesPage from '../pages/petowner/favoritesPages';
import ShelterNotifications from '../pages/Shelter/notifipage';
import Profile from '../pages/userprofilepage';
import Shelteruserprofile from '../pages/Shelter/shelteruserprofile';
import BookingPage from '../pages/bookingpage';
import PaymentSuccess from '../pages/paymentSuccess';
import PaymentFailed from '../pages/paymentfaliure';
import ShelterBookings from '../pages/Shelter/bookingmngpage';


export default function AppRouter() {

  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; 
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
        <Route path="/shelter-notifications" element={<ShelterNotifications />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/shelter/bookings" element={<ShelterBookings />} />




        <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
       <Route
        path="/sprofile"
        element={isAuthenticated ? <Shelteruserprofile /> : <Navigate to="/login" />}

        />



    </Routes>
    </BrowserRouter>
  );
}