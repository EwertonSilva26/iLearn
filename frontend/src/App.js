import React from 'react';

import './style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginProvider from './context/LoginProvider';
import HomeTeacherProvider from './context/HomeTeacherProvider';
import HomeStudentProvider from './context/HomeStudentProvider';
import Classprovider from './context/Classprovider';
import Optionalprovider from './context/OptionalProvider';
import Routes from './routes'

function App() {
  return (
    <Router>
      <LoginProvider>
        <HomeTeacherProvider>
          <HomeStudentProvider>
            <Classprovider>
              <Optionalprovider>
                <Routes />
              </Optionalprovider>
            </Classprovider>
          </HomeStudentProvider>
        </HomeTeacherProvider>
      </LoginProvider>
    </Router>
  );
}

export default App;
