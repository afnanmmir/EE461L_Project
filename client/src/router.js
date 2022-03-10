import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import LandingPage from "./pages/LandingPage";
import SignUpComponent from "./pages/SignUp";

const AppRouter = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LandingPage />}/>
            <Route exact path="/register" element={<SignUpComponent />}/>
        </Routes> 
      </BrowserRouter>     
  );
};

export default AppRouter