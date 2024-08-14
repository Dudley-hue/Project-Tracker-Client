import React, { useEffect, useState } from 'react';
import { authFetch } from '../components/authFetch';
import './Projects.css'; // Ensure this CSS file is created and used

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await authFetch('http://127.0.0.1:5000/api/projects');
        setProjects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {error && <p className="error">{error}</p>}
      <div className="project-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            {project.poster_url && <img src={project.poster_url} alt={project.name} className="project-image" />}
            <h2>{project.name}</h2>
            <p className="project-description">{project.description}</p>
            {project.github_link && (
              <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
