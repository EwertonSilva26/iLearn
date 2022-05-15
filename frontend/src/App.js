import React from 'react';

import './style.css';
import { BrowserRouter as Router} from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import Routes from './routes'

function App() {
  return (
    <Router>
      <LoginProvider>
        <Routes />
      </LoginProvider>
    </Router>
  );
}

export default App;
