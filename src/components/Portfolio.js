import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <h1>My Portfolio</h1>
      
      <section className="portfolio-section">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Description of project 1. You can add details about technologies used and your role.</p>
            <div className="project-links">
              <a href="#" className="project-link">Live Demo</a>
              <a href="#" className="project-link">GitHub</a>
            </div>
          </div>
          
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2. Showcase your best work here.</p>
            <div className="project-links">
              <a href="#" className="project-link">Live Demo</a>
              <a href="#" className="project-link">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>HTML/CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Experience</h2>
        <div className="experience-timeline">
          <div className="experience-item">
            <h3>Company Name</h3>
            <p className="position">Position Title</p>
            <p className="duration">2022 - Present</p>
            <p>Description of your role and achievements.</p>
          </div>
          <div className="experience-item">
            <h3>Previous Company</h3>
            <p className="position">Previous Position</p>
            <p className="duration">2020 - 2022</p>
            <p>Description of your previous role and achievements.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 