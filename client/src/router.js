/**
 * router.js routes each url path to its corresponding component it should render
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react'
import LandingPage from "./pages/LandingPage";
import SignUpComponent from "./pages/SignUp";
import LoginPage from "./pages/Login";
import DataSet from "./pages/DataSets";

const AppRouter = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LandingPage />}/>
            <Route exact path="/datasets" element={<DataSet />}/>
            <Route exact path="/register" element={<SignUpComponent />}/>
            <Route exact path="/login" element={<LoginPage />}></Route>
            
        </Routes> 
      </BrowserRouter>     
  );
};

export default AppRouter