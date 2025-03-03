/**
 * Profile page is accessible only to authenticated users (those who have a valid JWT token)
 */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userAPI';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
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
            } catch (error) {
                setError('Failed to fetch user profile');
            }
        }

        fetchUserProfile();
    }, [navigate]);

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>

                </div>
            ) : (
                <p>loading...</p>
            )}
        </div>
    )


};

export default Profile;