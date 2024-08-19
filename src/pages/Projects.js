import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get classId from the URL
import { authFetch } from '../components/authFetch';
import './Projects.css'; // Ensure this CSS file is created and used

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const { classId } = useParams(); // Get classId from the URL

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await authFetch(`https://project-tracker-server-sor4.onrender.com/api/classes/${classId}/projects`); // Fetch projects by classId
        setProjects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, [classId]); // Add classId as a dependency

  return (
    <div className="projects-container">
      <h1 className="projects-title">Projects in Class {classId}</h1> {/* Display the classId */}
      {error && <p className="error">{error}</p>}
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.poster_url && (
              <img
                src={project.poster_url}
                alt={project.name}
                className="project-image"
              />
            )}
            <h2>{project.name}</h2>
            <p className="project-description">{project.description}</p>
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
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
