import React from 'react';
import './App.css';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavbarComponent from '../Components/Navbar/Navbar';
import { useHistory } from 'react-router-dom';



function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let history = useHistory();

  return (
    <div className="App">
        <CssBaseline />
        <NavbarComponent
          history={history}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes
        isLoggedIn={isLoggedIn}
        history={history}
        setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  );
}

export default App;
