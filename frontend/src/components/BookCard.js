import { Link } from 'react-router-dom';
import GenreList from './GenreList';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  return (
    <li className="bookItem">
      <Link to={`/book/${book._id}`}>
        <img className="bookCardImage" src={book.coverImage} alt={book.title} />
      </Link>

      <div className="bookCardInfoContainer">
        <Link to={`/book/${book._id}`} className="bookCardTitleLink">
          <h3 className="bookCardTitle">{book.title}</h3>
        </Link>

        <h4 className="bookCardAuthors">
          Written By:{' '}
          {book.authors.map((author, index) => (
            <span key={index} className="bookCardAuthor">
              {author}
              {index < book.authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h4>
        <GenreList genres={book.genres} />
        <p
          className="bookCardDescription"
          dangerouslySetInnerHTML={{
            __html: book.description.replace(/\n/g, '<br>'),
          }}
        ></p>
      </div>
    </li>
  );
};

export default BookCard;
