import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        onLogin(true);
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login">
        <div className="login-header">
          <div className="lock-icon">
            <FaLock />
          </div>
          <h2>Restricted Access</h2>
          <p>Administrator Credentials Required.</p>
        </div>

        <Form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <Form.Group className="mb-3">
            <div className="input-icon-wrapper">
              <FaUser className="input-icon" />
              <Form.Control
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Username"
                required
                className="icon-input"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <Form.Control
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Password"
                required
                className="icon-input"
              />
            </div>
          </Form.Group>

          <Button 
            type="submit" 
            className="login-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin; 