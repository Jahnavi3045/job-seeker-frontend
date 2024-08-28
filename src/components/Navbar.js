import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="YourHR Logo" />
        <span className="navbar-title">yourHR</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/job-search">Find Jobs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
