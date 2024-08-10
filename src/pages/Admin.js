import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    ownerId: '',
    githubLink: '',
    classId: '',
    posterUrl: ''
  });

  // Fetch users and projects from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://127.0.0.1:5000/api/users');
        const projectsResponse = await fetch('http://127.0.0.1:5000/api/projects');
        
        if (usersResponse.ok && projectsResponse.ok) {
          const usersData = await usersResponse.json();
          const projectsData = await projectsResponse.json();
          
          setUsers(usersData);
          setRecentProjects(projectsData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle clicking on a project from the recent projects list
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Handle deleting a project from the recent projects list
  const handleDeleteProject = (e, index) => {
    e.stopPropagation(); // Prevent the click event from triggering handleProjectClick
    const updatedProjects = recentProjects.filter((_, i) => i !== index);
    setRecentProjects(updatedProjects);
    setSelectedProject(null); // Clear selected project if it's deleted
  };

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (response.ok) {
        const addedProject = await response.json();
        setRecentProjects([...recentProjects, addedProject]);
        setNewProject({
          name: '',
          description: '',
          ownerId: '',
          githubLink: '',
          classId: '', // Reset this field
          posterUrl: ''
        });
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="admin-dashboard">
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
            value={newProject.ownerId}
            onChange={(e) => setNewProject({ ...newProject, ownerId: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Class ID"
            value={newProject.classId}
            onChange={(e) => setNewProject({ ...newProject, classId: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newProject.posterUrl}
            onChange={(e) => setNewProject({ ...newProject, posterUrl: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="submit-btn">Add Project</button>
        </form>
      </div>

      <div className="dashboard-content">
        <div className="user-list">
          <h2>User List</h2>
          <ul>
            {users.length > 0 ? (
              users.map((user, index) => (
                <li key={index} onClick={() => handleProjectClick(user.project)}>
                  {user.username} - {user.email}
                </li>
              ))
            ) : (
              <p>No users available</p>
            )}
          </ul>
        </div>

        <div className="recent-projects">
          <h2>Recent Projects</h2>
          <ul>
            {recentProjects.length > 0 ? (
              recentProjects.map((project, index) => (
                <li key={index} onClick={() => handleProjectClick(project)}>
                  {project.name}
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteProject(e, index)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No recent projects available</p>
            )}
          </ul>
        </div>
      </div>

      {/* Display selected project details */}
      {selectedProject && (
        <div className="project-details">
          <img
            src={selectedProject.posterUrl}
            alt={selectedProject.name}
            className="project-image"
          />
          <div>
            <h3>{selectedProject.name}</h3>
            <p><strong>Owner:</strong> {selectedProject.ownerId}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p>
              <strong>GitHub Link:</strong>{' '}
              <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                {selectedProject.githubLink}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
