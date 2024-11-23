// import { useEffect, useState } from 'react';
import './App.css';
import {HeaderDiv, IntroBox, PathDiv} from './home';
import Footer from './footer';
import Filter from './filter';
import Explore from './explore';
import Navbar from './components/Navbar'
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
