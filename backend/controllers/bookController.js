//Contains the logic for implementing book requests
/**
 * This includes:
 * Find or create a book (POST)
 * Add tag to book (POST)
 * Get book data from Google Books (GET)
 * Querying the database for all books with optional search and filter parameters (GET) - to list books by title, genre, author, etc...
 * Vote on tag for an existing book (PATCH)
 * Update an existing book (PATCH)
 * Favorite/unfavoriting a book (updating popularity count) (PATCH)
 * Deleting a book (DELETE)
 */
const axios = require('axios');
const Book = require('../models/book');
const Review = require('../models/review');
const Tag = require('../models/tag');
const User = require('../models/user');
const Genre = require('../models/genre');

const { createTag, updateTagPopularity } = require('../controllers/tagController');
const { fetchByTitle, fetchByISBN } = require('../utils/openLibraryAPI');
const { genresToIds } = require('../controllers/genreController');
const { formatDescription } = require('../utils/formatText');

//Get book by title
const getBook = async(title) => {
    return await Book.findOne({ title: { $regex: title, $options: 'i' } });
}

// Create a book in the database
const createBook = async (searchQuery) => {
    try {
        const {title, author, genre, isbn} = searchQuery;

        let bookData;

        if (title) {
            bookData = await fetchByTitle(title);
        }

        else if (isbn) {
            //Check if its a valid isbn and if we have book in our db but just havent added the isbn
            let response = await axios.get(`https://openlibrary.org/search.json?isbn=${isbn}`);
            if (!response.data.docs || response.data.docs.length === 0) throw new Error('No results found invalid isbn');
            let book = response.data.docs[0];
            let findBook = await getBook(book.title);
            if (findBook) {
                //Add the ISBN if it's not already in the array
                findBook = await Book.findOneAndUpdate(
                    {_id: findBook._id},
                    {$addToSet: {isbns: isbn}},
                    {new: true} //Returns the updated doc
                );
                return [findBook];
            }
            //Else, create the book by the isbn
            bookData = await fetchByISBN(isbn);
        }

        let genreArr = bookData.genres;

        //Convert genres to their respective IDs
        genreArr = genresToIds(genreArr);

        let formattedDescription = formatDescription(bookData.description)
  
        // Create a new book if data is valid
        const newBook = new Book({
            title: bookData.title,
            authors: bookData.authors,
            genres: genreArr,
            tags: [], //Tags are added later by the users
            description: formattedDescription,
            publishedYear: bookData.publishedYear,
            coverImage: bookData.coverImage,  // Store the cover image URL
            OLKey: bookData.OLKey,
            isbns: bookData.isbns,
        });
    
        // Save the new book to the database
        await newBook.save();

        // Return the newly created book
        return [newBook];
    } catch (error) {
        res.status(500).json({ message: 'Error processing your request', error });
    }
};

// Add tag to a book
const addTagToBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { tagName } = req.body;

        const book = await Book.findById(bookId)
            .populate('tags.tagId')

        if (!book) return res.status(404).json({ message: 'Book not found' });
        const tagExists = book.tags.some(t => t.tagId.name.toLowerCase() === tagName.toLowerCase());
        if (tagExists) return res.status(400).json({ message: 'Tag is already added to this book' });
       
        let tag = await createTag(tagName);  // Create or find the tag by name
        // Add tag to the book's tags array (book-specific popularityCount is 0)
        book.tags.push({
            tagId: tag._id,
            popularityCount: 1,
        });
        await book.save();

        // Increment the global popularity count of the tag using TagController
        await updateTagPopularity(tag._id, 1);  // Increment global popularity by 1
        
        const populatedBook = await Book.findById(bookId)
            .populate('tags.tagId')
            .populate('genres')
        res.status(200).json(populatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error adding tag to book', error });
    }
};

// Vote on a tag for a book (upvote or downvote)
const voteOnTagForBook = async (req, res) => {
    try {
        const { bookId, tagId } = req.params;
        const { vote } = req.body;  // Get the vote (1 for like, -1 for dislike)

        // Error check: vote must be either 1 or -1
        if (![1, -1].includes(vote)) return res.status(400).json({ message: 'Invalid vote value' });

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check if the tag is associated with the book
        const tag = book.tags.find(t => t.tagId.toString() === tagId);
        if (!tag) return res.status(400).json({ message: 'Tag not associated with this book' });

        // Increment or decrement the book-specific popularity count based on the vote
        if (vote === 1) {
            tag.popularityCount += 1;
        } else {
            tag.popularityCount -= 1;
        }

        await book.save();

        // Update the global popularity count of the tag using TagController
        await updateTagPopularity(tagId, vote);  // Update global popularity (increment or decrement)

        const populatedBook = await Book.findById(bookId)
            .populate('tags.tagId')
            .populate('genres')
        res.status(200).json(populatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error voting on tag for book', error });
    }
};

//Get book by id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('tags.tagId')
            .populate('genres')

        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error getting book by id', error});
    }
}

//Get book by title or isbn
//If there is no book with the title or isbn we must create it (e.g., use Open Library API)
const getBookByTitleOrIsbn = async (req, res) => {
    const { title, isbn } = req.query;
    query = {};

    if (title) {
        //if title query is provided, use a case-insensitive regular express to match the title
        query.title = { $regex: title, $options: 'i'};
    }
    if (isbn) {
        //isbn in the book model is a array
        const isbnArray = isbn.split(',').map(i => i.trim()); //Convert input into an array
        query.isbns = {$in: isbnArray}; //Match any book that has one of the isbns in the input array
    }

    try {
        let books = await Book.find(query)
            .populate('tags.tagId') //Tells mongoose to replace the tags field (which contains an array of tag IDs) with the actual tag documents
            .populate('genres')

        //Attempt to create a book if its not found
        if (books.length === 0) {
            console.log('No books found, attempting to create');
            books = await createBook(req.query);
            books = books[0]
            books = await Book.findById(books._id).populate('genres');
        }
        res.status(200).json(books);
        } catch (error) {
        res.status(500).json({message: 'Error fetching book by title or isbn', error});
    }
}

//Get books by authors
const getBooksByAuthors = async (req, res) => {
    const { authors } = req.query;
    query = {};
    if (authors) {
        const authorsArray = authors.split(',').map(a => a.trim());
        //Ensure the book has ALL the given author names in some form
        //Accounts for the fact that the user might be lazy and only put first name and not full name
        query.$and = authorsArray.map(name => ({
            authors: {$regex: name, $options: 'i'}
        }));
    }

    try {
        const books = await Book.find(query)
            .populate('tags.tagId')
            .populate('genres')
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: 'Error fetching books by author(s)', error})
    }
}

//Get books by genres
const getBooksByGenres = async (req,res) => {
    const { genres }  = req.query;
    query = {};
    if (!genres) {
        return res.status(400).json({ message: 'Genres parameter is required' });
    }

    try {
        
        // Convert the user-inputted genre names into an array
        let genresArray = genres.split(',').map(g => g.trim().toLowerCase());

        // Find matching genres using both "name" and "keywords"
        const genreDocs = await Genre.find({
            $or: [
                { name: { $in: genresArray } },       // Direct name match
                { keywords: { $in: genresArray } }    // Match with keywords
            ]
        });

        // Extract genre IDs
        const genreIds = genreDocs.map(genre => genre._id);
        if (genreIds.length === 0) {
            return res.status(404).json({ message: 'No matching genres found' });
        }

        // Query books using the genre IDs
        const books = await Book.find({ genres: { $all: genreIds } })
            .populate('tags.tagId')
            .populate('genres')

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: 'Error fetching books by genre(s)', error})
    }
}

//Get books by tag
const getBooksByTags = async (req, res) => {
    const { tags } = req.query;
    if (!tags) {
      return res.status(400).json({ message: 'Tags parameter is required' });
    }
  
    try {
      const tagsArray = tags.split(',').map(t => t.trim().toLowerCase());
  
      // Find matching tags by name (case-insensitive)
      const tagDocs = await Tag.find({
        name: { $in: tagsArray.map(t => new RegExp(t, 'i')) }
      });
  
      const tagIds = tagDocs.map(tag => tag._id);
  
      if (tagIds.length === 0) {
        return res.status(404).json({ message: 'No matching tags found' });
      }
  
      const books = await Book.find({
        'tags.tagId': { $in: tagIds }
      })
      .populate('tags.tagId')
      .populate('genres');
  
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books by tag(s)', error });
    }
  };
  

//Get books by filtering by reviews, ratings, tags, genres, and authors
const filterBooks = async (req, res) => {

}

//Update an existing book 
const updateBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, authors, genres, tags, description, publishedYear } = req.body;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({message: 'Book not found'});
        if (tags) {
            //Look up the ObjectIds for the provided tag names
            const tagIds = await Tag.find({name: {$in: tags}}).select('_id');
            //Replace the existing subgenres with the new subgenreObjectIds
            book.tags = tagIds.map(t => t._id);
        }
        //Update only the fields provided in the request body
        if (title) book.title = title;
        if (authors) book.authors = authors;
        if (genres) book.genres = genres;
        if (description) book.description = description;
        if (publishedYear) book.publishedYear = publishedYear;
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: 'Error updating book', error});
    }
}

//Favorite/unfavorite a book
const favoriteBook = async (req, res) => {
    const {userId, bookId} = req.params;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(404).json({message: 'User or book not found'});

        //Check if book is already favorited by user 
        const isFavorited = user.favoriteBooks.includes(bookId);

        if (isFavorited) {
            //User wants to unfavorite, so decrement the popularity count
            await Book.findByIdAndUpdate(bookId, {$inc: {popularity: -1 }});
            //Remove the book from the user's favorites list
            await User.findByIdAndUpdate(userId, {$pull: {favoriteBooks: bookId}});
            return res.status(200).json({message: 'Book unfavorited'});
        } else {
            //User wants to favorite, so increment the popularity count
            await Book.findByIdAndUpdate(bookId, {$inc: {popularity: 1}});
            //Add book to the user's favorites list
            await User.findByIdAndUpdate(userId, {$push: {favoriteBooks: bookId}});
            return res.status(200).json({message: 'Book favorited'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error handling favorite/unfavorite', error});
    }
}

//Bookmark/unbookmark a book
const bookmarkBook = async (req, res) => {
    const {userId, bookId} = req.params;
    try {
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) return res.status(400).json({message: 'User or book not found'});

        //Check if the book is already bookmarked by user
        const isBookmarked = user.bookmarkedBooks.includes(bookId);

        if (isBookmarked) {
            await User.findByIdAndUpdate(userId, {$pull: {bookmarkedBooks: bookId}});
            return res.status(200).json({message: 'Book unbookmarked'});
        } else {
            await User.findByIdAndUpdate(userId, {$push: {bookmarkedBooks: bookId}});
            return res.status(200).json({message: 'Book bookmarked'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error handling bookmark/unbookmark', error});
    }
}

//Delete an existing book by ID
const deleteBookById = async (req, res) => {
    try{
        const { bookId } = req.params;
        const book = Book.findById(bookId);
        if (!book) return res.status(400).json({message: 'Book not found'});
        await book.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Unable to delete book', error});
    }
}

module.exports= { 
    createBook, 
    addTagToBook, 
    voteOnTagForBook, 
    getBookById,
    getBookByTitleOrIsbn, 
    getBooksByGenres,
    getBooksByAuthors,
    getBooksByTags,
    updateBookById, 
    favoriteBook, 
    deleteBookById,
    bookmarkBook
};