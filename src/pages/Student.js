import React, { useState, useEffect } from 'react';
import './Student.css';

function Student() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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
  const [updatedProject, setUpdatedProject] = useState({
    name: '',
    description: '',
    owner_id: '',
    github_link: '',
    class_id: '',
    poster_url: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
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

  // Handle selecting a project
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setUpdatedProject({
      name: project.name || '',
      description: project.description || '',
      owner_id: project.owner_id || '',
      github_link: project.github_link || '',
      class_id: project.class_id || '',
      poster_url: project.poster_url || ''
    });
    setPopupVisible(true);
  };

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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

  // Handle updating a project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
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

  // Handle closing the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProject(null);
  };

  return (
    <div className="student-dashboard">
      <div className="project-list">
        <h2>Projects</h2>
        <input
          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {filteredProjects.map(project => (
            <li
              key={project.id}
              className="project-item"
              onClick={() => handleSelectProject(project)}
            >
              <span className="project-title">{project.name}</span>
              {project.poster_url && <img src={project.poster_url} alt={project.name} className="project-poster" />}
            </li>
          ))}
        </ul>
      </div>

      <div className={`project-popup ${popupVisible ? 'visible' : ''}`}>
        {selectedProject ? (
          <div>
            <h2>Project Details</h2>
            <p><strong>Name:</strong> {selectedProject.name}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p><strong>Owner ID:</strong> {selectedProject.owner_id}</p>
            <p><strong>GitHub Link:</strong> <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer">{selectedProject.github_link}</a></p>
            <p><strong>Class ID:</strong> {selectedProject.class_id}</p>
            {selectedProject.poster_url && <img src={selectedProject.poster_url} alt={selectedProject.name} className="project-poster" />}
            <button onClick={handleClosePopup} className="close-btn">Close</button>
            
            <h3>Update Project</h3>
            <form onSubmit={handleUpdateProject}>
              <input
                type="text"
                placeholder="Name"
                value={updatedProject.name}
                onChange={(e) => setUpdatedProject({ ...updatedProject, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={updatedProject.description}
                onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Owner ID"
                value={updatedProject.owner_id}
                onChange={(e) => setUpdatedProject({ ...updatedProject, owner_id: e.target.value })}
              />
              <input
                type="text"
                placeholder="GitHub Link"
                value={updatedProject.github_link}
                onChange={(e) => setUpdatedProject({ ...updatedProject, github_link: e.target.value })}
              />
              <input
                type="text"
                placeholder="Class ID"
                value={updatedProject.class_id}
                onChange={(e) => setUpdatedProject({ ...updatedProject, class_id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Poster URL"
                value={updatedProject.poster_url}
                onChange={(e) => setUpdatedProject({ ...updatedProject, poster_url: e.target.value })}
              />
              <button type="submit">Update Project</button>
            </form>
          </div>
        ) : (
          <div>No project selected</div>
        )}
      </div>

      <div className="add-project-form">
        <h2>Add New Project</h2>
        <form onSubmit={handleAddProject}>
          <input
            type="text"
            placeholder="Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Owner ID"
            value={newProject.owner_id}
            onChange={(e) => setNewProject({ ...newProject, owner_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.github_link}
            onChange={(e) => setNewProject({ ...newProject, github_link: e.target.value })}
          />
          <input
            type="text"
            placeholder="Class ID"
            value={newProject.class_id}
            onChange={(e) => setNewProject({ ...newProject, class_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newProject.poster_url}
            onChange={(e) => setNewProject({ ...newProject, poster_url: e.target.value })}
          />
          <button type="submit">Add Project</button>
        </form>
      </div>

      <div className="add-member-form">
        <h2>Add Project Member</h2>
        <form onSubmit={handleAddMember}>
          <input
            type="text"
            placeholder="Project ID"
            value={newMember.project_id}
            onChange={(e) => setNewMember({ ...newMember, project_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="User ID"
            value={newMember.user_id}
            onChange={(e) => setNewMember({ ...newMember, user_id: e.target.value })}
          />
          <button type="submit">Add Member</button>
        </form>
      </div>
    </div>
  );
}

export default Student;
