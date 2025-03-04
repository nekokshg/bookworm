//A component to display a list of books, including details like title, author, tags...
import BookCard from "./BookCard";
import '../styles/BookList.css'

const BookList = ({books}) => {
    return (
        <ul className="bookList">
            {books.map(book => (
                <BookCard key={book._id} book={book} />
            ))}
        </ul>
    )
}

export default BookList;