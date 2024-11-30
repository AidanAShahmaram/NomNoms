// import { useEffect, useState } from 'react';

import './App.css';
import {HeaderDiv, IntroBox, PathDiv} from './home';
import Footer from './footer';
import Filter from './filter';
import Explore from './explore';
import Navbar from './components/Navbar'
import ChooseLogin from './components/ChooseLogin.js';
import ChooseSignUp from './components/ChooseSignUp.js';
import Login from './components/Login.js'
import BusinessLogin from './components/BusinessLogin.js';
import SignUp from './components/SignUp.js'
import BusinessSignUp from './components/BusinessSignUp.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <HeaderDiv />
              <IntroBox />
              <PathDiv />
            </>
            } />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Filter />} />
          <Route path="/chooselogin" element={<ChooseLogin />} />
          <Route path="/choosesignup" element={<ChooseSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/businesslogin" element={<BusinessLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/businesssignup" element={<BusinessSignUp />} />
        </Routes>
      </div>
      <Footer />
    </>

  );
}

export default App;



// {/* <Explore /> */}
    //  {/* <Filter /> */}
      // <HeaderDiv />
      // <IntroBox />
      // <PathDiv></PathDiv>
      // <Footer />
