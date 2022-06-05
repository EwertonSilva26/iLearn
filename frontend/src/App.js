import React from 'react';

import './style.css';
import { BrowserRouter as Router} from 'react-router-dom';
// import LoginProvider from './context/LoginProvider';
import HomeProvider from './context/HomeProvider';
import Routes from './routes'

function App() {
  return (
    <Router>
      <HomeProvider>
        <Routes />
      </HomeProvider>
    </Router>
  );
}

export default App;
