import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import PopupMessage from '../components/PopupMessage';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/auth/login', {
                email,
                password,
            });
            
            auth.login(response.data.token);
            setMessage('Login successful!');
            setMessageType('success');

            setTimeout(() => {
                if (auth.role === 'patient') navigate('/dashboard');
                else if (auth.role === 'admin') navigate('/admin-dashboard');
                else if (auth.role === 'medical_support') navigate('/support-dashboard');
                else navigate('/login');
            }, 1000);

        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const closePopup = () => {
        setMessage(null);
        setMessageType(null);
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="auth-links">
                <Link to="/register">Don't have an account? Register</Link>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {message && messageType && (
                <PopupMessage message={message} type={messageType} onClose={closePopup} />
            )}
        </div>
    );
};

export default Login;
