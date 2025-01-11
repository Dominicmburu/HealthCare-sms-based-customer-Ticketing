import React from 'react';
import '../styles/Home.css';
import images from '../assets/images';

const Home: React.FC = () => (
  <div className="home-container">
    <div className="content">
      <h1 className="home-title">
        Welcome to <span className="highlight-text">HealthLine</span>
      </h1>
      <p className="subtitle">Your Healthcare SMS-Based Customer Support System</p>
      <p className="description">
        HealthLine is designed to streamline patient support for healthcare
        organizations, ensuring timely responses and efficient ticket
        management through SMS-based communication.
      </p>
    </div>

    <div className="image-container">
      <img src={images.homeBackground} alt="Healthcare Professionals" className="healthcare-image" />
    </div>
  </div>
);

export default Home;
