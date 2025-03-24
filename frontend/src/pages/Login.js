/**
 * Login Page:
 * -A user enters their credentials
 * -After authentication, the backend returns a JWT Token
 * -The token is stored in localStorage, and the user is redirected to their Profile page (protected)
 */
import React, { useState } from 'react';
import { loginUser } from '../services/userAPI';
import '../styles/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ usernameOrEmail, password });
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      setError('Error logging in user, please try again');
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginTitle">Welcome back</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          {error && <div className="loginError">{error}</div>}
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="loginInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
            required
          />
          <button type="submit" className="loginButton_">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
