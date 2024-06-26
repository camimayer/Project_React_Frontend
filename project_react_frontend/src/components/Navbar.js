import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="https://www.pintoburguer.com.br/wp-content/uploads/2021/09/sanduiche_natural-600x589.jpg" alt="Logo" />
            </Link>
            <div className="navbar-links">
                {token ? (
                    <>
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/add" className="navbar-link">Add</Link>
                        <button onClick={handleLogout} className="navbar-link logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/signup" className="navbar-link">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
