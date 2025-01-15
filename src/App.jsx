import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

const AppContent = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = () => {
            const authStatus = localStorage.getItem('isAuthenticated') === 'true';
            const tokenExpiration = parseInt(localStorage.getItem('tokenExpiration'), 10);
            const currentTime = Date.now();

            setIsAuthenticated(authStatus && tokenExpiration > currentTime);
        };

        checkAuthentication();

        // Optionally, add a timer to auto-logout after token expiration
        const interval = setInterval(checkAuthentication, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className={isDarkMode ? 'bg-[#242424] text-white' : 'bg-white text-black'}>
            {isAuthenticated ? (
                <>
                    <Navbar />
                    <Home />
                </>
            ) : (
                <>
                    <Navbar />
                    <Login onLoginSuccess={handleLoginSuccess} />
                </>
            )}
        </div>
    );
};

const App = () => (
    <Provider store={store}>
        <AppContent />
    </Provider>
);

export default App;
