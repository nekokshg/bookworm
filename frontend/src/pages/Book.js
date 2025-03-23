import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookById, addTagToBook, voteOnTagForBook } from '../services/bookAPI';
import GenreList from '../components/GenreList';
import '../styles/Book.css';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };

    fetchBook();
  }, [id]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      const updatedBook = await addTagToBook(id, newTag);
      setBook(updatedBook);
      setNewTag('');
    } catch (err) {
      console.error('Error adding tag:', err);
    }
  };

  const handleVote = async (tagId, voteValue) => {
    try {
      const updatedBook = await voteOnTagForBook(id, tagId, voteValue);
      setBook(updatedBook);
    } catch (err) {
      console.error('Error voting on tag', err);
    }
  }

  if (!book) return <p>Loading...</p>;

  return (
    <div className="bookInfoContainer">
      <div className="bookHeader">
        <img className="bookCover" src={book.coverImage} alt={book.title} />
        <div className="bookMainInfo">
          <h2 className="bookTitle">{book.title}</h2>
          <p className="bookAuthors">
            Written by: {book.authors.join(', ')}
          </p>
          <p className="bookPublished">Published: {book.publishedYear}</p>

          <h3>Genres</h3>
          <GenreList genres={book.genres} />

          <div className="bookTagsSection">
            <h3>Tags</h3>
            <ul className="tagList">
              {book.tags.map(tag => (
                <li key={tag._id} className="tagItem">
                  <span>{tag.tagId.name}</span>
                  <span className="tagVotes">Popularity: {tag.popularityCount}</span>
                  <button onClick={() => handleVote(tag.tagId._id, 1)}>👍</button>
                  <button onClick={() => handleVote(tag.tagId._id, -1)}>👎</button>
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
        className="bookDetailDescription"
        dangerouslySetInnerHTML={{
          __html: book.description.replace(/\n/g, '<br>'),
        }}
      />

      <div className="bookReviewContainer"></div>
    </div>
  );
};

export default Book;
