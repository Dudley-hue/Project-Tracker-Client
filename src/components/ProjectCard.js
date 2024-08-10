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
    // Mock data to use instead of fetching from backend
    const mockProjects = [
      {
        id: 1,
        name: "Project A",
        description: "Description of Project A",
        poster_url: "https://via.placeholder.com/150",
        github_link: "https://github.com/user/project-a"
      },
      {
        id: 2,
        name: "Project B",
        description: "Description of Project B",
        poster_url: "https://via.placeholder.com/150",
        github_link: "https://github.com/user/project-b"
      },
      {
        id: 3,
        name: "Project C",
        description: "Description of Project C",
        poster_url: "https://via.placeholder.com/150",
        github_link: "https://github.com/user/project-c"
      },

      {
        id: 4,
        name: "Project D",
        description : "Description of Project D",
        poster_url: "https://via.placeholder.com/150",
        github_link: "https://github.com/user/project-d"
        
      },
      

    ];

    // Simulate network request with a timeout
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000); // Adjust the delay as needed
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
