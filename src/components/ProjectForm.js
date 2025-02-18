import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './ProjectForm.css';
import AdminLogin from './AdminLogin';

const ProjectForm = ({ onProjectSubmitted }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    githubLink: '',
    demoLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 201) {
        setFormData({
          title: '',
          content: '',
          imageUrl: '',
          githubLink: '',
          demoLink: ''
        });
        setShowForm(false);
        if (onProjectSubmitted) {
          onProjectSubmitted(response.data);
        }
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        alert('Authentication expired. Please login again.');
      } else {
        alert('Failed to submit project. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setShowForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-section">
        <AdminLogin onLogin={setIsAuthenticated} />
      </div>
    );
  }

  return (
    <div className="project-form-container">
      <div className="admin-controls">
        <Button 
          className="toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '− Close Form' : '+ Add New Project'}
        </Button>
        <Button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit} className="project-form">
          <Form.Group className="mb-3">
            <Form.Label>Project Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter project title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Describe your project"
              rows={4}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GitHub Link</Form.Label>
            <Form.Control
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              placeholder="Enter GitHub repository URL"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Demo Link</Form.Label>
            <Form.Control
              type="url"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              placeholder="Enter live demo URL"
            />
          </Form.Group>

          <Button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Project'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProjectForm; 