import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookById, addTagToBook, voteOnTagForBook } from '../services/bookAPI';
import GenreList from '../components/GenreList';
import '../styles/Book.css';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [newTag, setNewTag] = useState('');
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [sortType, setSortType] = useState('default');

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

      </div>
    </div>
  );
};

export default Book;
