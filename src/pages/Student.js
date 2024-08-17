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
  const [showAddForm, setShowAddForm] = useState(false);

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
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="student-dashboard">
      <div className="add-project">
        <button onClick={() => setShowAddForm(!showAddForm)} className="show-add-form-btn">
          {showAddForm ? 'Cancel' : 'Add New Project'}
        </button>
        {showAddForm && (
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
        )}
      </div>

      <div className="project-list">
        <h2>Your Projects</h2>
        <input
          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="project-items">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-item">
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>Owner ID: {project.owner_id}</p>
                <p>GitHub Link: <a href={project.github_link} target="_blank" rel="noopener noreferrer">{project.github_link}</a></p>
                <p>Class ID: {project.class_id}</p>
                <img src={project.poster_url} alt={project.name} className="project-image" />
                <button onClick={() => handleSelectProject(project)} className="edit-btn">Edit</button>
              </div>
              {selectedProject && selectedProject.id === project.id && (
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
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Student;
