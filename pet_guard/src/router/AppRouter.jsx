import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landingpage from '../pages/landingpage'


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landingpage />}></Route>
       

    </Routes>
    </BrowserRouter>
  );
}