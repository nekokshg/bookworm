import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAPI';
import '../styles/Register.css';

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ username, email, password });
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      setError('Error registering user, please try again.');
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">Create your account</h2>
        <form onSubmit={handleSubmit} className="registerForm">
          {error && <div className="registerError">{error}</div>}
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="registerInput"
            required
          />
          <button type="submit" className="registerButton_">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
