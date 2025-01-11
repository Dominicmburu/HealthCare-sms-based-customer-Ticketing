import React, { useState, useEffect } from 'react';
import '../../styles/Settings.css';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { userId, token } = useAuth(); // Get userId and token from the Auth context
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Fetch the user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId && token) {
        try {
          const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setEmail(userData.email); // Assuming email is available in the response
            setPhoneNumber(userData.phoneNumber); // Assuming phone number is available
          } else {
            setDialogMessage('Failed to fetch user details.');
            setIsError(true);
            setIsDialogOpen(true);
          }
        } catch (error) {
          setDialogMessage('An error occurred while fetching user details.');
          setIsError(true);
          setIsDialogOpen(true);
        }
      }
    };

    fetchUserDetails();
  }, [userId, token]); // Fetch user details when the userId or token changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the passwords match
    if (password && password !== confirmPassword) {
      setDialogMessage('Passwords do not match!');
      setIsError(true);
      setIsDialogOpen(true);
      return;
    }

    // Prepare the data for the PUT request
    const updatedDetails = {
      email,
      phoneNumber,
      password: password || undefined, // Only include password if it's provided
    };

    try {
      if (userId && token) {
        // Use the userId from the token to dynamically construct the API URL
        const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the header for authorization
          },
          body: JSON.stringify(updatedDetails),
        });

        if (response.ok) {
          setDialogMessage('Profile updated successfully!');
          setIsError(false);
          setIsDialogOpen(true);
        } else {
          setDialogMessage('Failed to update profile. Please try again.');
          setIsError(true);
          setIsDialogOpen(true);
        }
      } else {
        setDialogMessage('User not authenticated. Please log in.');
        setIsError(true);
        setIsDialogOpen(true);
      }
    } catch (error) {
      setDialogMessage('An error occurred while updating your profile.');
      setIsError(true);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">Confirm New Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="update-button">Update</button>
      </form>

      {/* Custom Dialog */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className={`dialog-content ${isError ? 'error' : 'success'}`}>
            <h3>{isError ? 'Error' : 'Success'}</h3>
            <p>{dialogMessage}</p>
            <button
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
