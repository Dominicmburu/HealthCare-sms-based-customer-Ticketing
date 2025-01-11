import React from 'react';
import images from '../assets/images'; 
import '../styles/Contact.css';

const Contact: React.FC = () => (
  <div className="contact-container">
    <div className="contact-content">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, please feel free to reach out to us.</p>
      
      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="form-input" />
        <input type="email" placeholder="Your Email" className="form-input" />
        <textarea placeholder="Your Message" className="form-textarea"></textarea>
        <button type="submit" className="form-button">Send Message</button>
      </form>
    </div>
    <div className="contact-image-container">
      <img src={images.contactImage} alt="Contact HealthLine" className="contact-image" />
    </div>
  </div>
);

export default Contact;
