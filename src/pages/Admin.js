import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };
  }

  return fetch(url, options).then(response => {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
      }
      throw new Error('Request failed');
    }
    return response.json();
  });
}

function Admin() {
  const [users, setUsers] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    owner_id: '',
    github_link: '',
    class_id: '',
    poster_url: ''
  });
  const [newCohort, setNewCohort] = useState({
    name: '',
    description: '',
    classes: [{ name: '', description: '' }]
  });
  const [cohorts, setCohorts] = useState([]);

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [cohortSearchQuery, setCohortSearchQuery] = useState('');

  const [showCohortList, setShowCohortList] = useState(true);
  const [showUserList, setShowUserList] = useState(true);
  const [showRecentProjects, setShowRecentProjects] = useState(true);
  const [showAddProject, setShowAddProject] = useState(true);
  const [showAddCohort, setShowAddCohort] = useState(true);

  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const data = await authFetch('http://127.0.0.1:5000/api/check_admin');
        if (!data.is_admin) {
          navigate('/login'); // Redirect to login if not admin
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  // Fetch users, projects, and cohorts from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await authFetch('http://127.0.0.1:5000/api/users');
        const projectsData = await authFetch('http://127.0.0.1:5000/api/projects');
        const cohortsData = await authFetch('http://127.0.0.1:5000/api/cohorts');

        setUsers(usersData);
        setRecentProjects(projectsData);
        setCohorts(cohortsData);
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
  const handleDeleteProject = async (e, projectId) => {
    e.stopPropagation(); // Prevent the click event from triggering handleProjectClick
    try {
      await authFetch(`http://127.0.0.1:5000/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      const updatedProjects = recentProjects.filter(project => project.id !== projectId);
      setRecentProjects(updatedProjects);
      setSelectedProject(null); // Clear selected project if it's deleted
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const addedProject = await authFetch('http://127.0.0.1:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      setRecentProjects([...recentProjects, addedProject]);
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

  // Handle adding a new cohort
  const handleAddCohort = async (e) => {
    e.preventDefault();
    try {
      const addedCohort = await authFetch('http://127.0.0.1:5000/api/cohorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCohort)
      });
      setNewCohort({
        name: '',
        description: '',
        classes: [{ name: '', description: '' }]
      });
      setCohorts([...cohorts, addedCohort]); // Update the cohorts list
    } catch (error) {
      console.error('Error adding cohort:', error);
    }
  };

  // Handle deleting a cohort and all its classes and projects
  const handleDeleteCohort = async (cohortId) => {
    try {
        await authFetch(`http://127.0.0.1:5000/api/cohorts/${cohortId}`, {
            method: 'DELETE',
        });
        const updatedCohorts = cohorts.filter(cohort => cohort.id !== cohortId);
        setCohorts(updatedCohorts);
    } catch (error) {
        console.error('Error deleting cohort:', error);
    }
  };

  // Handle adding more classes to the new cohort form
  const handleAddClassField = () => {
    setNewCohort({
      ...newCohort,
      classes: [...newCohort.classes, { name: '', description: '' }]
    });
  };

  // Filter users, projects, and cohorts based on their respective search queries
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const filteredProjects = recentProjects.filter(project =>
    project.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(projectSearchQuery.toLowerCase())
  );

  const filteredCohorts = cohorts.filter(cohort =>
    cohort.name.toLowerCase().includes(cohortSearchQuery.toLowerCase()) ||
    cohort.description.toLowerCase().includes(cohortSearchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="collapsible-section">
        <h2 onClick={() => setShowCohortList(!showCohortList)} className="collapsible-header">
          Cohort List
        </h2>
        {showCohortList && (
          <div className="cohort-list">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Cohorts..."
                value={cohortSearchQuery}
                onChange={(e) => setCohortSearchQuery(e.target.value)}
              />
            </div>
            <ul>
              {filteredCohorts.length > 0 ? (
                filteredCohorts.map((cohort) => (
                  <li key={cohort.id}>
                    {cohort.name}
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCohort(cohort.id)}
                    >
                      Delete Cohort
                    </button>
                  </li>
                ))
              ) : (
                <p>No cohorts available</p>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="dashboard-content">
        <div className="collapsible-section">
          <h2 onClick={() => setShowUserList(!showUserList)} className="collapsible-header">
            User List
          </h2>
          {showUserList && (
            <div className="user-list">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search Users..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                />
              </div>
              <ul>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li key={user.id}>
                      {user.username} - {user.email}
                    </li>
                  ))
                ) : (
                  <p>No users available</p>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="collapsible-section">
          <h2 onClick={() => setShowRecentProjects(!showRecentProjects)} className="collapsible-header">
            Recent Projects
          </h2>
          {showRecentProjects && (
            <div className="recent-projects">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search Projects..."
                  value={projectSearchQuery}
                  onChange={(e) => setProjectSearchQuery(e.target.value)}
                />
              </div>
              <ul>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <li key={project.id} onClick={() => handleProjectClick(project)}>
                      {project.name}
                      <button
                        className="delete-btn"
                        onClick={(e) => handleDeleteProject(e, project.id)}
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
          )}
        </div>
      </div>

      <div className="add-section">
        <div className="collapsible-section">
          <h2 onClick={() => setShowAddProject(!showAddProject)} className="collapsible-header">
            Add New Project
          </h2>
          {showAddProject && (
            <div className="add-project">
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
          )}
        </div>

        <div className="collapsible-section">
          <h2 onClick={() => setShowAddCohort(!showAddCohort)} className="collapsible-header">
            Add New Cohort
          </h2>
          {showAddCohort && (
            <div className="add-cohort">
              <form onSubmit={handleAddCohort} className="add-cohort-form">
                <input
                  type="text"
                  placeholder="Cohort Name"
                  value={newCohort.name}
                  onChange={(e) => setNewCohort({ ...newCohort, name: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Cohort Description"
                  value={newCohort.description}
                  onChange={(e) => setNewCohort({ ...newCohort, description: e.target.value })}
                  className="form-input"
                />
                
                <h3>Classes</h3>
                {newCohort.classes.map((cls, idx) => (
                  <div key={idx} className="class-input-group">
                    <input
                      type="text"
                      placeholder="Class Name"
                      value={cls.name}
                      onChange={(e) => {
                        const newClasses = [...newCohort.classes];
                        newClasses[idx].name = e.target.value;
                        setNewCohort({ ...newCohort, classes: newClasses });
                      }}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Class Description"
                      value={cls.description}
                      onChange={(e) => {
                        const newClasses = [...newCohort.classes];
                        newClasses[idx].description = e.target.value;
                        setNewCohort({ ...newCohort, classes: newClasses });
                      }}
                      className="form-input"
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddClassField} className="add-class-btn">Add Another Class</button>
                <button type="submit" className="submit-btn">Add Cohort with Classes</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Display selected project details */}
      {selectedProject && (
        <div className="project-details">
          <img
            src={selectedProject.poster_url || 'https://via.placeholder.com/200'}
            alt={selectedProject.name}
            className="project-image"
          />
          <div>
            <h3>{selectedProject.name}</h3>
            <p><strong>Owner:</strong> {selectedProject.owner_id}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p>
              <strong>GitHub Link:</strong>{' '}
              <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer">
                {selectedProject.github_link}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
