import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import LandingPage from "./pages/LandingPage";
import SignUpComponent from "./pages/SignUp";

const router = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={< LandingPage />}></Route>
            <Route exact path='/register' element={< SignUpComponent />}></Route>
        </Routes> 
      </BrowserRouter>     
  );
};

export default router