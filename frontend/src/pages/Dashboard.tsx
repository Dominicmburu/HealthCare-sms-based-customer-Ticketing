import React from 'react';
import { FaBell, FaUserMd, FaTachometerAlt, FaPlus, FaLifeRing, FaCog } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul className="sidebar-links">
          <li><FaUserMd className="icon" /> Healthcare</li>
          <li><FaTachometerAlt className="icon" /> Dashboard</li>
          <li><FaPlus className="icon" /> Create Ticket</li>
          <li><FaLifeRing className="icon" /> Support</li>
          <li><FaCog className="icon" /> Settings</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header-nav">
          <h2>Welcome Dominic</h2>
          <div className="header-icons">
            <FaBell className="notification-icon" />
            <button className="logout-button">Logout</button>
          </div>
        </div>

        <div className="ticket-summary">
          <div className="ticket-card">5<br />Total Tickets</div>
          <div className="ticket-card">5<br />Opened Tickets</div>
          <div className="ticket-card">5<br />In-progress Tickets</div>
          <div className="ticket-card">5<br />Closed Tickets</div>
        </div>

        <div className="ticket-search">
          <input type="text" placeholder="Search by name" />
          <select className="filter-button">
            <option value="all">Tickets</option>
            <option value="all">open</option>
            <option value="all">in progress</option>
            <option value="all">closed</option>
          </select>
        </div>

        <div className="ticket-list">
          <div className="ticket-item">
            <span className="status open">open</span>
            <p>Unable to access account</p>
            <div className="ticket-actions">
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>

          <div className="ticket-item">
            <span className="status in-progress">in progress</span>
            <p>Unable to access account</p>
            <div className="ticket-actions">
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>

          <div className="ticket-item">
            <span className="status in-progress">in progress</span>
            <p>Unable to access account</p>
            <div className="ticket-actions">
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>

          <div className="ticket-item">
            <span className="status in-progress">in progress</span>
            <p>Unable to access account</p>
            <div className="ticket-actions">
              <button>View</button>
              <button>Delete</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
