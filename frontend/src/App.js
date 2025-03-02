//Main component that sets up routing and contains layout elements like navigation
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import SearchPage from './pages/Search';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //Check if the user has a valid JWT token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); //If token exists, user is authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage />} /> 

        {/* Only show login or register if the user is NOT authenticated */}
        <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/register' element={isAuthenticated ? <Navigate to='/' /> : <RegisterPage />} />

        <Route path ='/search' element={<SearchPage />} />

        {/* Private Routes */}
        <Route 
          path='/profile'
          element={isAuthenticated ? <ProfilePage/> : <Navigate to='/login' />}
        />

      </Routes>
    </Router>
  )
}

export default App;
