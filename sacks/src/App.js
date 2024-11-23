// import { useEffect, useState } from 'react';
import './App.css';
import {HeaderDiv, IntroBox, PathDiv} from './home';
import Footer from './footer';
import Filter from './filter';
import Explore from './explore';

function App() {
  return (
    <div className="app-div">
      <Explore />
      {/* <Filter /> */}
      {/* <HeaderDiv />
      <IntroBox />
      <PathDiv></PathDiv>
      <Footer /> */}
    </div>
  );
}

export default App;
