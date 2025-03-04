//A smaller component that represents each book within a list, showing title, cover image, and tags.
import '../styles/BookCard.css';

const BookCard = ({book}) => {
    return (
        <li className="bookItem">
            <img className="bookImage" src={book.coverImage} />
            <div className='bookInfoContainer'>
                <h3 className="bookTitle">{book.title}</h3>
                <p className="bookDescription"
                    dangerouslySetInnerHTML={{__html: book.description.replace(/\n/g, '<br>')}}
                ></p>
            </div>
        </li>
    )
}

export default BookCard;