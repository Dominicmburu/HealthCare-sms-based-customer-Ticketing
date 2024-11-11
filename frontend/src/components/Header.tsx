import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import images from '../assets/images'; 
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>


      <header className="header">
        <div className="header-content">
          <img src={images.logo} alt="HealthLine Logo" className="logo" />

          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >Home</Link>

            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >About Us</Link>

            <Link
              to="/dashboard"
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              id='dashboard'
              onClick={closeMobileMenu}
            >Dashboard</Link>

            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >Contact Us</Link>
            
          </nav>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            &#9776;
          </button>

        </div>
      </header>
    </>
  );
};

export default Header;
