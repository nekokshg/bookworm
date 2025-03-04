import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { getBooks} from '../services/bookAPI';
import '../styles/Search.css';

const Search = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [previousQuery, setPreviousQuery] = useState('');
    const location = useLocation(); //Get the current location (URL)

    const searchParams = new URLSearchParams(location.search);
    const queryParams = {};
    searchParams.forEach((value, key) => {
        queryParams[key] = value;
    })

    if (JSON.stringify(queryParams) !== JSON.stringify(previousQuery)) { 
        setPreviousQuery(queryParams)
        setResults([]);

        getBooks(queryParams)
            .then((data) => {
                setResults(data);
            })
            .catch((err) => {
                setError('Failed to get books')
            })
    }

    //Need to add a filter by favorites option
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