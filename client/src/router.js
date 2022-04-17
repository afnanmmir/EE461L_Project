/**
 * router.js routes each url path to its corresponding component it should render
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import React from 'react'
import LandingPage from "./pages/LandingPage";
import SignUpComponent from "./pages/SignUp";
import LoginPage from "./pages/Login";
import DataSet from "./pages/DataSets";
import Projects from "./pages/Projects";
import { useAuthContext } from "./Authentication";

const AppRouter = () => {
  const context = useAuthContext();
  return (
    <div>
        {context.isAuth ? <AuthApp/> : <UnAuthApp/>}
    </div> 
  );
};

function AuthApp() {
  console.log("I am here")
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<LandingPage />}/>
          <Route exact path="/datasets" element={<DataSet />}/>
          <Route exact path="/register" element={<SignUpComponent />}/>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/projects" element={<Projects />}></Route>
      </Routes> 
    </BrowserRouter>     
);
}

function UnAuthApp() {
  console.log("What is this")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route exact path='/login' element={<LoginPage />}/>
        <Route exact path='/register' element={<SignUpComponent />}/>
        <Route path="/projects" element={<Navigate to="/login" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter