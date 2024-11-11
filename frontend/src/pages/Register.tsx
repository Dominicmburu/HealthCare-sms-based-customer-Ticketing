import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';
import PopupMessage from '../components/PopupMessage';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:3000/api/auth/register', {
                email,
                password,
                phoneNumber,
            });
            setMessage('Registration successful! Please login.');
            setMessageType('success');

            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (error) {
            setMessage('Registration failed. Please try again.');
            setMessageType('error');
        }
    };

    const closePopup = () => {
        setMessage(null);
        setMessageType(null);
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div className="auth-links">
                <Link to="/login">Already have an account? Login</Link>
            </div>

            {message && messageType && (
                <PopupMessage message={message} type={messageType} onClose={closePopup} />
            )}

        </div>
    );
};

export default Register;
