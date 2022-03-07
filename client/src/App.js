import logo from './logo.svg';
import './App.css';
import SignUpComponent from './pages/SignUp';
import router from './router';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
        <LandingPage />
        <router />
    </div>
  );
}

export default App;
