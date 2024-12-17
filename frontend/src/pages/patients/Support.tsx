import React from 'react';
import '../../styles/Support.css';

const Support: React.FC = () => {
  return (
    <div className="support-container">
      <h2>Support Center</h2>
      <div className="support-content">
        <p>
          Welcome to the <strong>Support Center</strong>. Here, you'll find all the guidance you need to make the most of our system. If you have any questions or face challenges, we're here to assist.
        </p>

        <h3>How to Use the System</h3>
        <ul>
          <li>
            <strong>Create a Ticket:</strong> Go to the 'Create Ticket' section to submit your concerns. Provide a clear subject and detailed description for quicker resolution.
          </li>
          <li>
            <strong>Track Your Tickets:</strong> Visit the Dashboard to view the status of your submitted tickets and monitor progress in real time.
          </li>
          <li>
            <strong>Profile Management:</strong> Keep your profile updated in the 'Settings' section for more tailored and efficient support.
          </li>
          <li>
            <strong>Contact Us:</strong> For urgent technical issues, reach out to support directly via email or phone.
          </li>
        </ul>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <ul>
          <li><strong>Q:</strong> How long does it take to resolve a ticket? <br />
            <strong>A:</strong> Response times depend on the complexity of the issue, but most tickets are addressed within 24–48 hours.
          </li>
          <li><strong>Q:</strong> Can I edit a submitted ticket? <br />
            <strong>A:</strong> Currently, you cannot edit tickets after submission. However, you can create a follow-up ticket if needed.
          </li>
        </ul>

        <h3>Contact Information</h3>
        <p>
          If you encounter issues or need further assistance, please don't hesitate to contact us:
        </p>
        <ul className="contact-info">
          <li>Email: <strong><a href="mailto:support@healthline.com">support@healthline.com</a></strong></li>
          <li>Phone: <strong>+1 (555) 123-4567</strong></li>
          <li>Support Hours: <strong>Monday–Friday, 9 AM to 6 PM (EST)</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default Support;
