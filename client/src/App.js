import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import CreateProject from './components/CreateProject';

import SignUpComponent from './pages/SignUp';
import AppRouter from './router';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import { AuthContextProvider, useAuthContext } from './Authentication';
import LoginPage from './pages/Login';

function App() {
  const context = useAuthContext()
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouter/>
      </AuthContextProvider>
    </div>
  );
}



export default App;
