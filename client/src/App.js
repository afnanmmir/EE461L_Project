import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import CreateProject from './components/CreateProject';

import SignUpComponent from './pages/SignUp';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { AuthContextProvider } from './Authentication';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
