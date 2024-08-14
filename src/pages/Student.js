import React, { useState, useEffect } from 'react';
import './Student.css';

function Student() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    owner_id: '',
    github_link: '',
    class_id: '',
    poster_url: ''
  });
  const [newMember, setNewMember] = useState({
    project_id: '',
    user_id: ''
  });

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      try {
        const response = await fetch('http://127.0.0.1:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    try {
      const response = await fetch('http://127.0.0.1:5000/api/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProjects([...projects, data]);
      setNewProject({
        name: '',
        description: '',
        owner_id: '',
        github_link: '',
        class_id: '',
        poster_url: ''
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Handle adding a new project member
  const handleAddMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    try {
      const response = await fetch('http://127.0.0.1:5000/api/project_members', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewMember({
        project_id: '',
        user_id: ''
      });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="student-dashboard">
      <div className="add-project">
        <h2>Add New Project</h2>
        <form onSubmit={handleAddProject} className="add-project-form">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={newProject.owner_id}
            onChange={(e) => setNewProject({ ...newProject, owner_id: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.github_link}
            onChange={(e) => setNewProject({ ...newProject, github_link: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Class ID"
            value={newProject.class_id}
            onChange={(e) => setNewProject({ ...newProject, class_id: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newProject.poster_url}
            onChange={(e) => setNewProject({ ...newProject, poster_url: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="submit-btn">Add Project</button>
        </form>
      </div>

      <div className="add-member">
        <h2>Add Project Member</h2>
        <form onSubmit={handleAddMember} className="add-member-form">
          <input
            type="text"
            placeholder="Project ID"
            value={newMember.project_id}
            onChange={(e) => setNewMember({ ...newMember, project_id: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="User ID"
            value={newMember.user_id}
            onChange={(e) => setNewMember({ ...newMember, user_id: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="submit-btn">Add Member</button>
        </form>
      </div>

      <div className="view-projects">
        <h2>Existing Projects</h2>
        <ul>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id}>
                <h3>{project.name}</h3>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Owner ID:</strong> {project.owner_id}</p>
                <p><strong>GitHub Link:</strong> 
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                    {project.github_link}
                  </a>
                </p>
                <img
                  src={project.poster_url || 'https://via.placeholder.com/200'}
                  alt={project.name}
                  className="project-image"
                />
              </li>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Student;