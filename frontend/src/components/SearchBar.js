//A search bar component for searching books by title, genre, tag, etc.

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import searchBook from '../assets/search-book.svg'
import '../styles/SearchBar.css'

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim() !== '') {
            navigate(`/search?query=${query}`);
        }
    }

    return (
        <div className='searchContainer'>
            <form onSubmit={handleSubmit} className='searchForm'>
                <input 
                    className='searchInput'
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search for books by title, genre, tag, ISBN...'
                    required
                />
                <button className='submitButton' type='submit'>
                    <img src={searchBook} alt='submit' className='submitImage' />
                </button>
            </form>
        </div>
    )
}

export default SearchBar;