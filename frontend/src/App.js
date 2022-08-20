import React from 'react';

import './style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';

import Routes from './routes'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
      <Routes />
    </Router>
  );
}

export default App;
