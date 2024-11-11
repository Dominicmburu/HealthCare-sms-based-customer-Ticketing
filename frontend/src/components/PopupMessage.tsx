import React from 'react';
import '../styles/PopupMessage.css';

interface PopupMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, type, onClose }) => {
  return (
    <div className={`popup-message ${type}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default PopupMessage;
