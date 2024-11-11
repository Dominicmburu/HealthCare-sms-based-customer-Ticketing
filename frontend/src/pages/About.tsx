import React from 'react';
import images from '../assets/images';
import '../styles/About.css';

const About: React.FC = () => (
  <div className="about-container">
    <div className="about-content">
      <h1>About Us</h1>
      <p>
        HealthLine is committed to revolutionizing patient support for healthcare organizations.
        Our mission is to streamline communication and enhance patient satisfaction through an
        SMS-based customer support system that is accessible, efficient, and user-friendly.
      </p>
      <p>
        Our platform offers a seamless experience for both healthcare providers and their patients,
        ensuring timely responses, effective ticket management, and a commitment to excellence.
      </p>
    </div>

    <div className="about-image-container">
      <img src={images.aboutImage} alt="About HealthLine" className="about-image" />
    </div>
  </div>
);

export default About;
