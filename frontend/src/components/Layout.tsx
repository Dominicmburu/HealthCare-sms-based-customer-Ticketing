import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaBell, FaTachometerAlt, FaPlus, FaLifeRing, FaCog } from 'react-icons/fa';
import '../styles/Layout.css';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderLinks = () => {
    switch (role) {
      case 'patient':
        return (
          <>
            <li>
              <Link to="/dashboard">
                <FaTachometerAlt className="icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/create-ticket">
                <FaPlus className="icon" /> Create Ticket
              </Link>
            </li>
            <li>
              <Link to="/support">
                <FaLifeRing className="icon" /> Support
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FaCog className="icon" /> Settings
              </Link>
            </li>
          </>
        );
      case 'admin':
        return (
          <>
            <li>
              <Link to="/admin-dashboard">
                <FaTachometerAlt className="icon" /> Admin Dashboard
              </Link>
            </li>
            <li>
              <Link to="/manage-tickets">
                <FaPlus className="icon" /> Manage Tickets
              </Link>
            </li>
            <li>
              <Link to="/admin-settings">
                <FaCog className="icon" /> Admin Settings
              </Link>
            </li>
          </>
        );
      case 'medical_support':
        return (
          <>
            <li>
              <Link to="/support-dashboard">
                <FaTachometerAlt className="icon" /> Support Dashboard
              </Link>
            </li>
            <li>
              <Link to="/active-tickets">
                <FaPlus className="icon" /> Active Tickets
              </Link>
            </li>
            <li>
              <Link to="/support-settings">
                <FaCog className="icon" /> Support Settings
              </Link>
            </li>
          </>
        );
      default:
        return <li>Loading...</li>;
    }
  };

  return (
    <div className="layout-container">
      <div className="sidebar">
        <ul className="sidebar-links">{renderLinks()}</ul>
      </div>

      <div className="main-content">
        <div className="header-nav">
          <h2>Welcome to Your Dashboard</h2>
          <div className="header-icons">
            <FaBell className="notification-icon" />
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="content-area">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
