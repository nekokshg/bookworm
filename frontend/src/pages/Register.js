
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAPI';

const Register = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); //To hold error message

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, email, password });
            //Store the token in localStorage
            localStorage.setItem('token', response.token);

            //Store user data: user, email, favorite books

            setIsAuthenticated(true);

        } catch (error) {
            setError('Error registrating user, please try again.');
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input 
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register;