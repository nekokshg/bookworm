import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { findOrCreateBook } from '../services/bookAPI';
import '../styles/Search.css';

const Search = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [previousQuery, setPreviousQuery] = useState('');
    const location = useLocation(); //Get the current location (URL)

    const query = new URLSearchParams(location.search).get('query');
    if (query && query !== previousQuery) { 
        setPreviousQuery(query)
        setResults([]);

        // Call API here depending on query
        findOrCreateBook(query)
            .then((data) => {
                setResults(prevResults => [...prevResults, data]);
            })
            .catch((err) => {
                setError('Failed to fetch results');
            });
    }

    return (
    <div className='searchContainer'>
        <div className='searchBarContainer'>
            <SearchBar/>
        </div>
        {error && <p>{error}</p>}
        {results.length > 0 ? (
            <BookList books={results} />
        ) : (
            <p>No results found.</p>
        )}
    </div>
    )
}

export default Search;