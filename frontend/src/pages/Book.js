import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookById, addTagToBook, voteOnTagForBook } from '../services/bookAPI';
import { getReviewsForBook, createReview } from '../services/reviewAPI';
import StarRating from '../components/StarRating';
import GenreList from '../components/GenreList';
import ReadOnlyStarRating from '../components/ReadOnlyStarRating';
import '../styles/Book.css';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [sortType, setSortType] = useState('default');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };

    fetchBook();

    const fetchReviews = async () => {
      try {
        const data = await getReviewsForBook(id);
        setReviews(data);
      } catch (err) {
        console.error('Error getting reviews', err);
      }
    }
  
    fetchReviews();
  }, [id]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      const updatedBook = await addTagToBook(id, newTag);
      setBook(updatedBook);
      setNewTag('');
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add tag');
    }
  };

  const handleVote = async (tagId, voteValue) => {
    try {
      const updatedBook = await voteOnTagForBook(id, tagId, voteValue);
      setBook(updatedBook);
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to vote on tag');
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || !newReview.trim()) return;
    const userId = localStorage.getItem('userId');
    console.log(userId)
    try {
      const review = {
        userId,
        bookId: id,
        rating,
        content: newReview
      }

      const created = await createReview(review);
      setReviews(prev => [created, ...prev]);
      setNewReview('')
      setRating(0);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  }

  if (!book) return <p>Loading...</p>;

  let sortedTags = [...book.tags];

  if (sortType === 'popularity') {
    sortedTags.sort((a, b) => b.popularityCount - a.popularityCount);
  } else if (sortType === 'name') {
    sortedTags.sort((a, b) =>
      a.tagId.name.localeCompare(b.tagId.name)
    );
  }

  return (
    <div className="bookInfoContainer">
      <div className="bookHeader">
        <img className="bookCover" src={book.coverImage} alt={book.title} />
        <div className="bookMainInfo">
          <h2 className="bookTitle">{book.title}</h2>
          <p className="bookAuthors">
            Written By:{' '}
            {book.authors.map((author, index) => (
              <span key={index} className="bookAuthor">
                {author}
                {index < book.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          <p className="bookPublished">Published: {book.publishedYear}</p>

          <div className='bookGenresSection'>
            <h3>Genres</h3>
            <GenreList genres={book.genres} />
          </div>

          <div className="bookTagsSection">
            <h3>Tags</h3>
            <div className="tagControls">
            <select
              className="tagFilterSelect"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="default">Sort by default</option>
              <option value="popularity">Sort by popularity</option>
              <option value="name">Sort by name</option>
            </select>
            <label className="voteToggle">
              <input
                type="checkbox"
                checked={votingEnabled}
                onChange={() => setVotingEnabled(!votingEnabled)}
              />
              Vote on tags
            </label>
          </div>
            <ul className={`tagList ${votingEnabled ? 'voting' : 'displayOnly'}`}>
              {sortedTags.map(tag => (
                <li key={tag._id} className={`tagItem ${votingEnabled ? 'voting' : 'displayOnly'}`}>
                  <span>{tag.tagId.name}</span>
                  {votingEnabled && (
                    <div className="tagVoteButtons">
                      <button className="voteButton" onClick={() => handleVote(tag.tagId._id, 1)}>👍</button>
                      <button className="voteButton" onClick={() => handleVote(tag.tagId._id, -1)}>👎</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>


            <form onSubmit={handleAddTag} className="addTagForm">
              <input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
              />
              <button type="submit">Add Tag</button>
            </form>
          </div>
        </div>
      </div>

      <div
        className="bookDescription"
        dangerouslySetInnerHTML={{
          __html: book.description.replace(/\n/g, '<br>'),
        }}
      />

      <div className="bookReviewContainer">
        <h3>Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          <ul className='reviewList'>
            {reviews.map((review) => (
              <li key={review._id} className='reviewItem'>
                <strong>{review.userId.username}</strong>
                <ReadOnlyStarRating rating={review.rating} />
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmitReview} className="reviewForm">
          <label>
            Rating:
            <StarRating rating={rating} onChange={setRating} />
          </label>

          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Book;
