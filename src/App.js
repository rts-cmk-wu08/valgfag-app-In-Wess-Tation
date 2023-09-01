import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer';

function App() {


  return (
    <>

    <main>
      <Outlet />
    </main>
    
    <Footer />

    </>
    );
}

export default App;
