import axios from 'axios';

const getAllGenres = async () => {
    try {
        const response = await axios.get('/api/genres/');
        return response.data;
    } catch (error) {
        console.error('Error getting genres', error);
        throw error;
    }
}

export {
    getAllGenres
}