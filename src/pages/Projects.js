import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Projects.css';

const Projects = () => {
  const { classId } = useParams();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/projects?class_id=${classId}`);

        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [classId]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects">
      <h2>Projects in Class {classId}</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="project-list">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <img src={project.poster_url} alt={project.name} />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">GitHub Link</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
