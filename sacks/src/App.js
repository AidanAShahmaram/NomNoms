import './App.css';

import Home from './home';
import Explore from './explore';
import Filter from './filter';
import Search from './search';
import Footer from './footer';

import Navbar from './components/Navbar'
import LoggedInNavbar from './components/LoggedInNavbar.js';

import ChooseLogin from './components/ChooseLogin.js';
import ChooseSignUp from './components/ChooseSignUp.js';
import Login from './components/Login.js'
import SignUp from './components/SignUp.js'

import BusinessLogin from './components/BusinessLogin.js';
import BusinessSignUp from './components/BusinessSignUp.js';
import MyBusiness from './business';

import { Routes, Route, useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();
  const noNavbarFooter = ['/choosesignup', '/chooselogin', '/signup', '/login', '/businesssignup', '/businesslogin'];
  /* Using location, navbar and footer will not show for signup/login pages */
  
  const token = sessionStorage.getItem("token");

  return (
    <>
      {!noNavbarFooter.includes(location.pathname) && !token && <Navbar />}
      {!noNavbarFooter.includes(location.pathname) && token && <LoggedInNavbar />}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mybusiness" element={<MyBusiness />} />
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

