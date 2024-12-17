import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/CreateTicket.css';

const CreateTicket: React.FC = () => {
  const { token } = useAuth();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      setErrorMessage('You are not authenticated. Please log in.');
      return;
    }

    const ticketData = {
      subject,
      description,
    };

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://127.0.0.1:3000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create ticket: ${response.statusText}`);
      }

      setSubject('');
      setDescription('');
      setIsSuccessDialogOpen(true); // Open success dialog
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => setIsSuccessDialogOpen(false);

  return (
    <div className="create-ticket-container">
      <h2>Create Ticket</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label htmlFor="ticket-subject">Ticket Subject</label>
        <input
          type="text"
          id="ticket-subject"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label htmlFor="ticket-description">Ticket Description</label>
        <textarea
          id="ticket-description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* Success Dialog */}
      {isSuccessDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h3>Success</h3>
            <p>The ticket has been created successfully!</p>
            <button onClick={closeDialog} className="dialog-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
