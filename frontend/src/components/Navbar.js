//A component that contains links to different pages (e.g., Home, Search Books, User Profile, etc...)

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import home from '../assets/home.svg';
import search from '../assets/search.svg';
import profile from '../assets/user.svg';

const Navbar = () => {
    const location = useLocation();
    return (
        <div className='navContainer'>
            <ul className='navList'>
                <li className='navItem'>
                    <Link to='/' className='navLink'>
                    <span className='navEmoji' role='img' aria-label='Book Worm'>
                        🐛
                    </span>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/' className={`navLink ${location.pathname === '/' ? 'active' : ''}`}>
                        <img src={home} alt='Home' className='navImage'/>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/Search' className={`navLink ${location.pathname === '/Search' ? 'active' : ''}`}>
                        <img src={search} alt='Search' className='navImage'/>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/Profile' className={`navLink ${location.pathname === '/Profile' ? 'active' : ''}`}>
                        <img src={profile} alt='Profile' className='navImage'/>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;