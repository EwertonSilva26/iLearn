import React from 'react';

import './style.css';
import { BrowserRouter as Router} from 'react-router-dom';
// import LoginProvider from './context/LoginProvider';
import HomeStudentProvider from './context/HomeStudentProvider';
import Routes from './routes'

function App() {
  return (
    <Router>
      <HomeStudentProvider>
        <Routes />
      </HomeStudentProvider>
    </Router>
  );
}

export default App;
