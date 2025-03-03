//A component that contains links to different pages (e.g., Home, Search Books, User Profile, etc...)

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import appleBooks from '../assets/apple-books.svg';
import home from '../assets/home.svg';
import search from '../assets/search.svg';
import profile from '../assets/user.svg';

const Navbar = () => {
    return (
        <div className='navContainer'>
            <ul className='navList'>
                <li className='navItem'>
                    <Link to='/' className='navLink'>
                        <img src={appleBooks} alt='Logo' className='navImage'/>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/' className='navLink'>
                        <img src={home} alt='Home' className='navImage'/>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/Search' className='navLink'>
                        <img src={search} alt='Search' className='navImage'/>
                    </Link>
                </li>
                <li className='navItem'>
                    <Link to='/Profile' className='navLink'>
                        <img src={profile} alt='Profile' className='navImage'/>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;