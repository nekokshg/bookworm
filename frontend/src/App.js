//Main component that sets up routing and contains layout elements like navigation
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Book from './pages/Book';
import Navbar from './components/Navbar';
import ConfirmEmail from './pages/ConfirmEmail';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //Check if the user has a valid JWT token stored in localStorage
    const token = localStorage.getItem('token');

    setIsAuthenticated(!!token);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
      <Router>
        <div className='appContainer'>
          <Navbar />
          <div className='mainContentContainer'>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Home isAuthenticated={isAuthenticated} logoutUser={logoutUser}/>} /> 

              {/* Only show login or register if the user is NOT authenticated */}
              <Route path='/login' element={isAuthenticated ? <Navigate to='/profile' /> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
              <Route path='/register' element={isAuthenticated ? <Navigate to='/profile' /> : <Register setIsAuthenticated={setIsAuthenticated}/>} />
              
              <Route
                path="/confirm-email"
                element={<ConfirmEmail setIsAuthenticated={setIsAuthenticated} />}
              />

              <Route path ='/search' element={<Search />} />
              <Route path="/book/:id" element={<Book />} />
              {/* Private Routes */}
              <Route 
                path='/profile'
                element={isAuthenticated ? <Profile/> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
        </div>
      </Router>
  )
}

export default App;
