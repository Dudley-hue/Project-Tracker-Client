import React, { useEffect, useState } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="card">
      <img src={project.poster_url} alt={project.name} className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{project.name}</h5>
        <a href={project.github_link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <button onClick={toggleDescription} className="btn btn-secondary">
          {showDescription ? 'Hide Description' : 'View Description'}
        </button>
        {showDescription && <p className="card-text">{project.description}</p>}
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage or context
    const token = localStorage.getItem('jwtToken'); // Ensure you have set this token during login

    fetch('http://127.0.0.1:5000/api/projects', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include JWT token in Authorization header
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error fetching projects: {error}</p>;
  }

  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default Projects;
