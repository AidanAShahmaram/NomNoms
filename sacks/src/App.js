// import { useEffect, useState } from 'react';
import './App.css';
import {HeaderDiv, IntroBox, PathDiv} from './home';
import Footer from './footer';
import Filter from './filter';
import Explore from './explore';

import ChooseLogin from './components/ChooseLogin';
import ChooseSignUp from './components/ChooseSignUp';

import Login from './components/Login';
import SignUp from './components/SignUp';
import BusinessLogin from './components/BusinessLogin';
import BusinessSignUp from './components/BusinessSignUp';


import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chooselogin" element={<ChooseLogin />} />
          <Route path="/choosesignup" element={<ChooseSignUp />} />
          <Route path="/businesssignup" element={<BusinessSignUp />} />
          <Route path="/businesslogin" element={<BusinessLogin />} />
          
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
