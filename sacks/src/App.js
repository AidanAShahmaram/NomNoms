// import { useEffect, useState } from 'react';
import './App.css';
import {HeaderDiv, IntroBox, PathDiv} from './home';
import Footer from './footer';

function App() {
  return (
    <div className="app-div">
      <HeaderDiv />
      {/* <p>---------------------------------</p> */}
      <IntroBox />
      <PathDiv></PathDiv>
      <Footer />
    </div>
  );
}

export default App;
