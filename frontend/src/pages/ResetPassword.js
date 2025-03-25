import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/userAPI'; // make sure this is imported

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

    const token = searchParams.get('token');
    if (!token) {
      setMessage('Invalid or missing reset link.');
      return;
    }

    try {
      const res = await resetPassword(token, password);
      setMessage(res.message || 'Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2500); // wait 2.5 seconds before redirecting      
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
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="loginInput"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="loginInput"
            required
          />
          <label className="showPasswordToggle">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <button type="submit" className="loginButton_">Reset Password</button>
        </form>
        {message && <p className="loginError">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
