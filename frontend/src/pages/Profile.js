import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUserProfile,
  updateAvatar,
  updateUserBio,
  updateFavoriteGenres
} from '../services/userAPI';
import {
  getAllGenres
} from '../services/genreAPI';
import { getCachedGenres } from '../utils/genreCache';
import AvatarUploader from '../components/AvatarUploader';
import editIcon from '../assets/pencil.svg';
import GenreList from '../components/GenreList';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState('');
  const [allGenres, setAllGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [editingGenres, setEditingGenres] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getCachedGenres(getAllGenres);
        setAllGenres(genres);
      } catch (err) {
        console.error('Failed to load genres', err);
      }
    };
    fetchGenres();
  }, [])

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

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
    }
    if (user?.favoriteGenres) {
      setFavoriteGenres(user.favoriteGenres);
    }
  }, [user]);

  const handleAvatarUpload = async (base64Image) => {
    try {
      const token = localStorage.getItem('token');
      await updateAvatar(token, base64Image);
      setAvatar(base64Image);
      setShowUploader(false);
      setError('');
    } catch (err) {
      setError('Error uploading avatar');
    }
  };

  const handleBioSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateUserBio(token, bio); 
      setEditingBio(false);
    } catch (err) {
      setError('Failed to update bio');
    }
  };

  const handleGenreSelect = (e) => {
    const genreId = e.target.value;
    const genreObj = allGenres.find(g => g._id === genreId);
    if (!genreObj || favoriteGenres.find(g => g._id === genreId)) return;
    setFavoriteGenres([...favoriteGenres, genreObj]);
  }

  const removeGenre = (id) => {
    setFavoriteGenres(prev => prev.filter(g => g._id !== id));
  }

  const saveFavoriteGenres = async () => {
    try {
      const token = localStorage.getItem('token');
      const genreIds = favoriteGenres.map(g => g._id);
      await updateFavoriteGenres(token, genreIds);
      setError('');
    } catch (err) {
      setError('Failed to save favorite genres');
    }
  }

  const handleBookClick = (type) => {
    navigate(`/library/${type}`);
  };

  const getXpProgress = () => {
    const currentLevelXp = user?.xp || 0;
    const requiredXp = 100 * user?.level || 100;
    return Math.min((currentLevelXp / requiredXp) * 100, 100);
  };

  return (
    <div className="profileContainer">
      <h1 className="profileTitle">Profile</h1>
      {error && <p className="profileError">{error}</p>}

      {user ? (
        <>
          <div className="profileHeader">
            <div className="avatarWrapper" onClick={() => setShowUploader(true)}>
              <img src={avatar} alt="Avatar" className="avatarImage" />
              <div className="avatarOverlay">Change Avatar</div>
            </div>

            <div className="profileInfo">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <div className="levelStats">
                <p>Level {user.level}</p>
                <div className="xpBar">
                  <div className="xpFill" style={{ width: `${getXpProgress()}%` }}></div>
                </div>
                <p>{user.xp} XP</p>
              </div>
            </div>

            <div className='genreTagContainer'>
              <div className="section">
                <h3>Favorite Genres</h3>
                  <select onChange={handleGenreSelect} value="">
                    <option value="">Select a genre</option>
                    {
                      allGenres.map(genre => (
                        <option key={genre._id} value={genre._id}>
                          {genre.name}
                        </option>
                      ))
                    }
                  </select>      
                  <GenreList genres={favoriteGenres} />
                  <button onClick={saveFavoriteGenres} className="saveGenreBtn">Save Genres</button>
                  </div>

              <div className="section">
                <h3>Favorite Tags</h3>
                <ul className="tagList">
                  {user.favoriteTags?.map((tag) => (
                    <li key={tag._id}>{tag.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='section'>
            <div className='bioHeader'>
              <h3>About Me</h3>
              <img 
                src={editIcon}
                alt='Edit Bio'
                className='editIcon'
                onClick={() => setEditingBio(!editingBio)}
              />
            </div>
            {!editingBio ? (
              <div className='notebookPaper'>
                {bio || 'Write something about yourself...'}
              </div>
            ) : (
              <div className='bioEditWrapper'>
                <textarea
                  className='notebookTextarea'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder='Write something about yourself...'
                />
                <button onClick={handleBioSave} className='saveBioBtn'>Save</button>
              </div>
            )}
          </div>

          <div className="section">
            <h3>Favorite Books</h3>
            <ul className="bookList">
              {user.favoriteBooks?.slice(0, 10).map((book) => (
                <li key={book._id} onClick={() => handleBookClick('favorites')}>
                  <img src={book.coverImage} alt={book.title} />
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>Bookmarked Books</h3>
            <ul className="bookList">
              {user.bookmarkedBooks?.slice(0, 10).map((book) => (
                <li key={book._id} onClick={() => handleBookClick('bookmarked')}>
                  <img src={book.coverImage} alt={book.title} />
                </li>
              ))}
            </ul>
          </div>

          {showUploader && (
            <AvatarUploader onUpload={handleAvatarUpload} onClose={() => setShowUploader(false)} />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
