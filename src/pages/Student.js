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
  const [selectedProject, setSelectedProject] = useState(null);
  const [updatedProject, setUpdatedProject] = useState({
    name: '',
    description: '',
    owner_id: '',
    github_link: '',
    class_id: '',
    poster_url: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

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

  // Handle selecting a project to update
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setUpdatedProject({
      name: project.name,
      description: project.description,
      owner_id: project.owner_id,
      github_link: project.github_link,
      class_id: project.class_id,
      poster_url: project.poster_url
    });
  };

  // Handle updating a project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (selectedProject) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/projects/${selectedProject.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProject),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(projects.map((project) => 
          project.id === data.id ? data : project
        ));
        setSelectedProject(null);
        setUpdatedProject({
          name: '',
          description: '',
          owner_id: '',
          github_link: '',
          class_id: '',
          poster_url: ''
        });
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  // Filter projects by search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="update-project">
        {selectedProject && (
          <>
            <h2>Update Project</h2>
            <form onSubmit={handleUpdateProject} className="update-project-form">
              <input
                type="text"
                placeholder="Project Name"
                value={updatedProject.name}
                onChange={(e) => setUpdatedProject({ ...updatedProject, name: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Description"
                value={updatedProject.description}
                onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Owner ID"
                value={updatedProject.owner_id}
                onChange={(e) => setUpdatedProject({ ...updatedProject, owner_id: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="GitHub Link"
                value={updatedProject.github_link}
                onChange={(e) => setUpdatedProject({ ...updatedProject, github_link: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Class ID"
                value={updatedProject.class_id}
                onChange={(e) => setUpdatedProject({ ...updatedProject, class_id: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Poster URL"
                value={updatedProject.poster_url}
                onChange={(e) => setUpdatedProject({ ...updatedProject, poster_url: e.target.value })}
                className="form-input"
              />
              <button type="submit" className="submit-btn">Update Project</button>
              <button type="button" onClick={() => setSelectedProject(null)} className="cancel-btn">Cancel</button>
            </form>
          </>
        )}
      </div>

      <div className="search-project">
        <h2>Search Projects</h2>
        <input
          type="text"
          placeholder="Search by Project Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="project-list">
        <h2>Project List</h2>
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.id} className="project-item">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Owner ID: {project.owner_id}</p>
              <p>GitHub Link: <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>
              <p>Class ID: {project.class_id}</p>
              <p>Poster URL: <img src={project.poster_url} alt="Project Poster" className="poster-img" /></p>
              <button onClick={() => handleSelectProject(project)} className="edit-btn">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Student;
