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

import { Routes, Route, useLocation} from 'react-router-dom';



function App() {
  const location = useLocation();
  const noNavbarFooter = ['/choosesignup', '/chooselogin', '/signup', '/login', '/businessignup', '/businesslogin'];
  /* Using location, navbar and footer will not show for signup/login pages */
  return (
    <>
      {!noNavbarFooter.includes(location.pathname) && <Navbar />}
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

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chooselogin" element={<ChooseLogin />} />
          <Route path="/choosesignup" element={<ChooseSignUp />} />
          <Route path="/businesssignup" element={<BusinessSignUp />} />
          <Route path="/businesslogin" element={<BusinessLogin />} />
        </Routes>
      </div>
      {!noNavbarFooter.includes(location.pathname) && <Footer />}
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
