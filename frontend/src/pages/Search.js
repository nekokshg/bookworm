import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { getBooksByTitleOrIsbn, getBooksByGenres } from '../services/bookAPI';
import '../styles/Search.css';

const Search = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};
        searchParams.forEach((value, key) => {
            queryParams[key] = value;
        });

        setResults([]); // Reset on new search

        const fetchData = async () => {
            try {
                let data = [];
                if (queryParams.title) {
                    data = await getBooksByTitleOrIsbn(queryParams);
                } else if (queryParams.genres) {
                    data = await getBooksByGenres(queryParams);
                }

                if (data) {
                    setResults(Array.isArray(data) ? data : [data]); // normalize in case backend returns a single object
                } else {
                    setError('No books found');
                }
            } catch (err) {
                setError('Failed to get books');
                console.error(err);
            }
        };

        fetchData();
    }, [location.search]); // re-run when URL query changes

    return (
        <div className='searchContainer'>
            <div className='searchBarContainer'>
                <SearchBar />
            </div>
            {error && <p>{error}</p>}
            {results.length > 0 ? (
                <BookList books={results} />
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default Search;
