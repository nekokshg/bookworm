import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAPI';
import '../styles/Register.css';

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password.length < 8 ||                      // Minimum length
      !/[A-Z]/.test(password) ||                  // At least one uppercase letter
      !/[0-9]/.test(password) ||                  // At least one number
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)    // At least one symbol
    ) {
      setMessage("Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.");
      return;
    }
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({ username, email, password });
      
      // Don't log in yet — just show success message
      setMessage(response.message || 'Registration successful. Please check your email.');
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering user, please try again.');
    }
  };
  

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">Create your account</h2>
        <form onSubmit={handleSubmit} className="registerForm">
          {message && <div className="registerMessage">{message}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="registerInput"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="registerInput"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="registerInput"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='registerInput'
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
          <p className='forgotPasswordLink'>
            <a href='/login'>Already have an account? <strong>Login here</strong></a>
          </p>
          <button type="submit" className="registerButton_">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
