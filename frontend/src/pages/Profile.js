import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  getUserProfile,
  updateAvatar,
  updateProfile,
} from '../services/userAPI';
import {getAllGenres} from '../services/genreAPI';
import {getCachedGenres} from '../utils/genreCache';

import AvatarUploader from '../components/AvatarUploader';
import EditableGenreList from '../components/EditableGenreList';
import GenreList from '../components/GenreList';

import editIcon from '../assets/pencil.svg';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [allGenres, setAllGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getCachedGenres(getAllGenres);
        setAllGenres(genres);
      } catch (err) {
        console. error('Failed to laod genres', err);
      }
    };
    fetchGenres();
  }, []);

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
        setAvatar(data.avatarUrl || '');
        setBio(data.bio || '');
        setFavoriteGenres(data.favoriteGenres || []);
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
      setShowUploader(false);
      setError('');
    } catch (err) {
      setError('Error uploading avatar');
    }
  };

  const handleGenreSelect = (e) => {
    const genreId = e.target.value;
    const genreObj = allGenres.find(g => g._id === genreId);
    if (!genreObj || favoriteGenres.find(g => g._id === genreId)) return;
    setFavoriteGenres([...favoriteGenres, genreObj]);
    console.log(favoriteGenres)
  };

  const removeGenre = (id) => {
    setFavoriteGenres(prev => prev.filter(g => g._id !== id));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const genreIds = favoriteGenres.map(g => g._id);
      const updatedProfile = {
        bio,
        favoriteGenres: genreIds
      }
      const updatedUser = await updateProfile(token, updatedProfile);
      setFavoriteGenres(updatedUser.favoriteGenres);
      setEditingProfile(false);
    } catch (error) {
      setError('Failed to save profile')
    }
  };

  const handleBookClick = (type) => {
    navigate(`/library/${type}`);
  };

  const getXpProgress = () => {
    const currentLevelXp = user?.xp || 0;
    const requiredXp = 100 * (user?.level || 1);
    return Math.min((currentLevelXp / requiredXp) * 100, 100);
  };

  return (
    <div className="profileContainer">
      <h1 className="profileTitle">Profile</h1>
      {error && <p className="profileError">{error}</p>}

      {user ? (
        <>
          <div className="profileEditToggle">
            <img
              src={editIcon}
              alt="Edit Profile"
              className="editIcon"
              onClick={() => setEditingProfile(prev => !prev)}
            />
            {editingProfile && (
              <button className="saveProfileBtn" onClick={handleSaveProfile}>
                Save Changes
              </button>
            )}
          </div>

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
                  <div className="xpFill" style={{ width: `${getXpProgress()}%` }} />
                </div>
                <p>{user.xp} XP</p>
              </div>
            </div>
          </div>

          <div className="profileSection">
            <h3>Favorite Genres</h3>
            {editingProfile && (
              <select className='profileGenreSelect' onChange={handleGenreSelect} value="">
                <option value="">Select a genre</option>
                {allGenres.map(genre => (
                  <option key={genre._id} value={genre._id}>{genre.name}</option>
                ))}
              </select>
            )}
            {editingProfile ? (
              <EditableGenreList genres={favoriteGenres} onRemove={removeGenre} />
            ) : (
              <GenreList genres={favoriteGenres} />
            )}
          </div>

          <div className="profileSection">
            <h3>About Me</h3>
            {editingProfile ? (
              <textarea
                className="notebookTextarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself..."
              />
            ) : (
              <div className="notebookPaper">{bio || 'Write something about yourself...'}</div>
            )}
          </div>

          <div className="profileSection">
            <h3>Favorite Books</h3>
            <ul className="profileBooklist">
              {user.favoriteBooks?.slice(0, 10).map(book => (
                <li key={book._id} onClick={() => handleBookClick('favorites')}>
                  <img src={book.coverImage} alt={book.title} />
                </li>
              ))}
            </ul>
          </div>

          <div className="profileSection">
            <h3>Bookmarked Books</h3>
            <ul className="profileBooklist">
              {user.bookmarkedBooks?.slice(0, 10).map(book => (
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


