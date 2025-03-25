import axios from 'axios';

const getReviewsForBook = async (bookId) => {
    try {
        const response = await axios.get(`/api/reviews/book/${bookId}`);
        return response.data;
    } catch (error) {
        console.error('Error finding reviews for the book', error);
    }
}

const createReview = async(review) => {
    try {
        const response = await axios.post('/api/reviews/create', review);
        return response.data;
    } catch (error) {
        console.error('Error creating review for book', error)
    }
}

export {
    getReviewsForBook,
    createReview,
}