import React from 'react';

import './style.css';
import { BrowserRouter as Router} from 'react-router-dom';
// import LoginProvider from './context/LoginProvider';
// import HomeStudentProvider from './context/HomeStudentProvider';
// import HomeTeacherProvider from './context/HomeTeacherProvider';
import Classprovider from './context/Classprovider';

import Routes from './routes'

function App() {
  return (
    <Router>
      <Classprovider>
        <Routes />
      </Classprovider>
    </Router>
  );
}

export default App;
