import React from 'react';
import { Link } from 'react-router-dom';
// import './NavigationBar.css'; // Importing CSS for styling

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src="/logo192.png" alt="React Logo" className="logo"/>
                </Link>
            </div>
            <div className="nav-items">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/collection" className="nav-link">Collection</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="nav-items">
                <Link to="/cart" className="nav-link">Cart</Link>
                <Link to="/account" className="nav-link">Account</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
