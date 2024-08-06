import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Projects.css';

const projectsData = {
  1: [
    { id: 1, name: 'Project 1', description: 'Description for Project 1', github_link: '#', poster_url: '' },
    { id: 2, name: 'Project 2', description: 'Description for Project 2', github_link: '#', poster_url: '' },
    // Add more projects for Romans as needed
  ],
  2: [
    { id: 3, name: 'Project 1', description: 'Description for Project 1', github_link: '#', poster_url: '' },
    { id: 4, name: 'Project 2', description: 'Description for Project 2', github_link: '#', poster_url: '' },
    // Add more projects for Supremes as needed
  ],
  3: [
    { id: 5, name: 'Project 1', description: 'Description for Project 1', github_link: '#', poster_url: '' },
    { id: 6, name: 'Project 2', description: 'Description for Project 2', github_link: '#', poster_url: '' },
    // Add more projects for Class 1 as needed
  ],
  4: [
    { id: 7, name: 'Project 1', description: 'Description for Project 1', github_link: '#', poster_url: '' },
    { id: 8, name: 'Project 2', description: 'Description for Project 2', github_link: '#', poster_url: '' },
    // Add more projects for Class 2 as needed
  ],
};

const Projects = () => {
  const { classId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const classProjects = projectsData[classId] || [];

  const filteredProjects = classProjects.filter(project =>
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
