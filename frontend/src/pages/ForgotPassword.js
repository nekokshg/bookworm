import React, { useState } from 'react';
import { sendResetLink } from '../services/userAPI'; // You’ll create this next

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendResetLink(email);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginTitle">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="loginInput"
            required
          />
          <button type="submit" className="loginButton_">Send Reset Link</button>
        </form>
        {message && <p className="loginError">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
