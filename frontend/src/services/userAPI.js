import axios from 'axios';
import instance from './axiosConfig';

//Sends a POST request to the backend to register a user
const registerUser = async (user) => {
    //User will be an object that contains username, email, and password
    try {
        const response = await axios.post('/api/users/register', user);
        return response.data;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

//Sends a POST request to the backend to login a user
const loginUser = async (user) => {
    //User will be an object that contains email/username and password
    try{
        const response = await axios.post('/api/users/login', user);
        return response.data;
    } catch (error) {
        console.error('Error logging in user', error);
        throw error;
    }
}

//Sends a GET request to the backend to get the user data
const getUserProfile = async (token) => {
    try{
        const response = await instance.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile', error);
        throw error;
    }
}

//Sends a GET request to the backend to get the user data after the user confirmed their email
const confirmEmail = async(token) => {
    try {
        const response = await axios.get(`/api/users/confirm-email?token=${token}`);
        return response.data;
    } catch (error) {
        console.error('Error confirming email', error);
        throw error;
    }
}

//Sends a POST request to resend the confirmation email
const resendConfirmationEmail = async (email) => {
    try {
        const response = await axios.post('/api/users/resend-confirmation', {email});
        return response.data;
    } catch (error) {
        console.error('Error resending confirmation email', error);
        throw error;
    }
}

//Sends a POST request to create a reset request (email a password reset link)
const sendResetLink = async (email) => {
    try {
        const response = await axios.post('/api/users/request-password-reset', {email});
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset', error);
        throw error;
    }
}

//Sends a PATCH request to reset the password
const resetPassword = async (token, password) => {
    try {
        const response = await axios.patch('/api/users/reset-password', {token, password});
        return response.data;
    } catch (error) {
        console.error('Error resetting password', error);
        throw error;
    }
}

const updateProfile = async (token, profileData) => {
    try {
        const response = await axios.patch('/api/users/update-profile', 
            profileData,
            {headers: {
                Authorization: `Bearer ${token}`,
            }}
        )
        return response.data;
    } catch (error) {
        console.error('Error updating profile', error);
        throw error;
    }
}

//Sends a PATCH request to update the avatar
const updateAvatar = async (token, base64Image) => {
    try{
        const response = await axios.patch('/api/users/avatar', 
            {avatarUrl: base64Image}, 
            {headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating avatar', error);
        throw error;
    }
}

//Sends a PATCH request to update the user bio
const updateUserBio = async (token, bio) => {
    try {
        const response = await axios.patch('/api/users/bio', 
            {bio},
            {headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating bio', error);
        throw error;
    }
}

const updateFavoriteGenres = async (token, genreIds) => {
    try {
        const response = await axios.patch('/api/users/favorite-genres', 
            {favoriteGenres: genreIds},
            {headers: {
                Authorization: `Bearer ${token}`,
            }}
        );
        return response.data;
    } catch (error) {
        console.error('Error updating favorite genres', error);
        throw error
    }
}

export { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    confirmEmail, 
    resendConfirmationEmail, 
    sendResetLink, 
    resetPassword, 
    updateAvatar,
    updateUserBio,
    updateFavoriteGenres,
    updateProfile
}