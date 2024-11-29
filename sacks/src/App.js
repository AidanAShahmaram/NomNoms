// import { useEffect, useState } from 'react';
import useOnLoad from './onLoad';
import './App.css';
import Login from './components/Login.js'
import Navbar from './components/Navbar.js';
import SignUp from './components/SignUp.js'
import BusinessSignUp from './components/BusinessSignUp.js';
import ChooseLogin from './components/ChooseLogin.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  

  return (
    <>
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/chooselogin">Login</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/chooselogin" element={<ChooseLogin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>

  );
}

export default App;
