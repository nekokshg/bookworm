import axios from 'axios';

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
        const response = await axios.get('/api/users/profile', {
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

export { registerUser, loginUser, getUserProfile}