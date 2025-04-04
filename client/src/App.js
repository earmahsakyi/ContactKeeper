import React, { Fragment } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPasword';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment >
              <Navbar title="Contact Keeper" />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route path='/' element={<PrivateRoute element={Home} />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/forgot-password' element={<ForgotPassword/>}/>
                  <Route path='/reset-password' element={<ResetPassword/>}/>
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
