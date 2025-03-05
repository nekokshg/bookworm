import  React from 'react';
import { Link } from 'react-router-dom'; //For navigation
import SearchBar from '../components/SearchBar';
import '../styles/Home.css'

const Home = ({isAuthenticated, logoutUser}) => {

    return (
        <div className='homeContainer'>
            <div className='headerContainer'>
                <Link to='/'>
                    <h1 className='title'>Bookworm</h1>
                </Link>
                {!isAuthenticated ? (
                    <div className='buttonContainer'>
                        <Link to='/login'>
                            <button className='loginButton'>Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className='registerButton'>Register</button>
                        </Link>
                    </div>
                ) : (
                    <div className='buttonContainer'>
                        <button className='logoutButton' onClick={logoutUser}>Logout</button>
                    </div>
                )}
            </div>
            <div className='searchBarContainer'>
                <SearchBar />
            </div>
        </div>
    )
}

export default Home;