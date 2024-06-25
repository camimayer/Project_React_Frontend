import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="#" alt="Logo" />
            </Link>
            <div className="navbar-links">
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/signup" className="navbar-link">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
