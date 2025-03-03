import  React from 'react';
import { Link } from 'react-router-dom'; //For navigation

const Home = ({isAuthenticated, logoutUser}) => {

    return (
        <div>
            <h1>Home Page</h1>
            
            {!isAuthenticated ? (
                <div>
                    <Link to='/login'>
                        <button>Login</button>
                    </Link>
                    <br />
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Home;