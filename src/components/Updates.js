import React, { useState, useEffect } from 'react';
import './Updates.css';

const Updates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call when backend is ready
    const dummyUpdates = [
      {
        id: 1,
        title: "New Feature Release",
        date: "2024-03-20",
        description: "Launched new user dashboard with improved analytics",
        category: "Feature"
      },
      {
        id: 2,
        title: "Bug Fix Update",
        date: "2024-03-18",
        description: "Fixed performance issues in the mobile version",
        category: "Bug Fix"
      }
    ];
    setUpdates(dummyUpdates);
  }, []);

  return (
    <div className="updates-container">
      <h1>Latest Updates</h1>
      <div className="updates-list">
        {updates.map((update) => (
          <div key={update.id} className="update-card">
            <div className="update-header">
              <h2>{update.title}</h2>
              <span className="update-date">{update.date}</span>
            </div>
            <span className="update-category">{update.category}</span>
            <p className="update-description">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates; 