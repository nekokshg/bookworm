import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmEmail } from '../services/userAPI';
import '../styles/ConfirmEmail.css';

const ConfirmEmail = ({setIsAuthenticated}) => {
  const [message, setMessage] = useState('Verifying your email...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');
    if (!token) {
      setMessage('Invalid or missing confirmation link.');
      return;
    }

    const verify = async () => {
      try {
        const data = await confirmEmail(token);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user._id);
            setIsAuthenticated(true);
            navigate('/Profile');
          } else {
            setMessage(data.message || 'Email confirmed!');
            setTimeout(() => navigate('/Login'), 3000);
          }
      } catch (err) {
        const backendMsg =
          err.response?.data?.message ||
          'Email confirmation failed. This link may be invalid or expired.';
        setMessage(backendMsg);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="confirmEmailContainer">
      <div className="confirmEmailCard">
        <h2 className="confirmEmailTitle">📬 Email Confirmation</h2>
        <p className="confirmEmailMessage">{message}</p>
        <p className="confirmEmailNote">You’ll be redirected shortly...</p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
