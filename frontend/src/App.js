//Main component that sets up routing and contains layout elements like navigation
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';

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
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home isAuthenticated={isAuthenticated} logoutUser={logoutUser}/>} /> 

        {/* Only show login or register if the user is NOT authenticated */}
        <Route path='/login' element={isAuthenticated ? <Navigate to='/profile' /> : <Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/register' element={isAuthenticated ? <Navigate to='/profile' /> : <Register setIsAuthenticated={setIsAuthenticated}/>} />

        <Route path ='/search' element={<Search />} />

        {/* Private Routes */}
        <Route 
          path='/profile'
          element={isAuthenticated ? <Profile/> : <Navigate to='/login' />}
        />

      </Routes>
    </Router>
  )
}

export default App;
