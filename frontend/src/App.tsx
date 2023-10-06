import React from 'react';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import AllRoutes from './components/AllRoutes';
// import './App.css';

function App() {
  return (
    <div>
      <Navbar/>
      <AllRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
