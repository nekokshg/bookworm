import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateAvatar } from '../services/userAPI';
import AvatarUploader from '../components/AvatarUploader';
import editIcon from '../assets/pencil.svg';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setUser(data);
        if (data.avatarUrl) setAvatar(data.avatarUrl);
      } catch (err) {
        setError('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleAvatarUpload = async (base64Image) => {
    try {
      const token = localStorage.getItem('token');
      await updateAvatar(token, base64Image);
      setAvatar(base64Image);
      setError('');
    } catch (err) {
      setError('Error uploading avatar');
    }
  };

  return (
    <div className="profileContainer">
      <h1 className="profileTitle">Profile Page</h1>
      {error && <p className="profileError">{error}</p>}

      {user ? (
        <div className="profileContent">
          <p><strong>Username:</strong> {user.username}</p>

          <div className="avatarWrapper" onClick={() => setShowUploader(true)}>
            <img src={avatar} alt="User Avatar" className="avatarImage" />
            <div className="avatarOverlay">
                <span>Change Avatar</span>
            </div>
            </div>
            {showUploader && (
            <AvatarUploader onUpload={handleAvatarUpload} onClose={() => setShowUploader(false)} />
            )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
