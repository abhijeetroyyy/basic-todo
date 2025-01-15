import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { username, password } = credentials;

            // Replace with actual authentication logic or API call
            if (username === 'test_username' && password === 'test_password') {
                const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour

                // Store authentication data
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                onLoginSuccess(); // Notify parent component of successful login
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#242424] text-white' : 'bg-white text-black'}`}>
            <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-md ${isDarkMode ? 'bg-[#424242a8]' : 'bg-white'}`}>
                <h2 className="text-center text-3xl font-bold">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            placeholder="Enter username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-[#242424] text-white' : 'bg-white text-black'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            placeholder="Enter password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-[#242424] text-white' : 'bg-white text-black'}`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
