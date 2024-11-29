// import { useEffect, useState } from 'react';
import useOnLoad from './onLoad';
import './App.css';
import Login from './components/Login.js'
import Navbar from './components/Navbar.js';
import SignUp from './components/SignUp.js'
import BusinessSignUp from './components/BusinessSignUp.js';

function App() {
  const { isLoading, loadDisplay } = useOnLoad(3000);



  return (
    <>
    <Navbar />

    <SignUp></SignUp>

    <div className="Loader">
      {isLoading ? loadDisplay() :
      (
        <header className="App-header">
        <h1> Welcome to SACKS Restaurant App! </h1>
        
        
      </header>
      )}

      <Login />
      <BusinessSignUp></BusinessSignUp>
    </div>
    </>

  );
}

export default App;
