// import { useEffect, useState } from 'react';
import useOnLoad from './onLoad';
import './App.css';
import Login from './components/Login.js'
import Navbar from './components/Navbar.js';
import SignUp from './components/SignUp.js'
import BusinessLogin from './components/BusinessLogin.js';
import BusinessSignUp from './components/BusinessSignUp.js';
import ChooseLogin from './components/ChooseLogin.js';
import ChooseSignUp from './components/ChooseSignUp.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  

  return (
    <>
      <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/chooselogin">Login</Link></li>
            <li><Link to="/choosesignup">SignUp</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/chooselogin" element={<ChooseLogin />} />
          <Route path="/choosesignup" element={<ChooseSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/businesslogin" element={<BusinessLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/businesssignup" element={<BusinessSignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>

  );
}

export default App;
