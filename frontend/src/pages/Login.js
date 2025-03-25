/**
 * Login Page:
 * -A user enters their credentials
 * -After authentication, the backend returns a JWT Token
 * -The token is stored in localStorage, and the user is redirected to their Profile page (protected)
 */
import React, { useState } from 'react';
import { loginUser, resendConfirmationEmail } from '../services/userAPI';
import '../styles/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await loginUser({ usernameOrEmail, password });
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
      } catch (error) {
        const msg = error.response?.data?.message || 'Error logging in user, please try again';
        setError(msg);
    }
  };

  const handleResend = async (email) => {
    try {
      const data = await resendConfirmationEmail(email);
      alert(data.message);
    } catch (error) {
      const msg = error.response?.data?.message || 'Error resending confirmation email';
      setError(msg);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginTitle">Welcome back</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          {error && (
            <div className="loginError">
            {error}
            {error.includes('confirm your email') && (
                <button
                  className='resendButton'
                  onClick={() => handleResend(usernameOrEmail)}>
                    Resend confirmation email
                </button>
              )}
          </div>
          )}
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="loginInput"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
            required
          />
          <label className='showPasswordToggle'>
            <input
              type='checkbox'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <button type="submit" className="loginButton_">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
