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
  const [newCohort, setNewCohort] = useState({
    name: '',
    description: '',
    classes: [{ name: '', description: '' }]
  });
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [editCohort, setEditCohort] = useState({
    name: '',
    description: '',
    classes: [{ name: '', description: '' }]
  });

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [cohortSearchQuery, setCohortSearchQuery] = useState('');

  const [showCohortList, setShowCohortList] = useState(true);
  const [showUserList, setShowUserList] = useState(true);
  const [showAddCohort, setShowAddCohort] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const data = await authFetch('https://project-tracker-server-sor4.onrender.com/api/check_admin');
        if (!data.is_admin) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await authFetch('https://project-tracker-server-sor4.onrender.com/api/users');
        const cohortsData = await authFetch('https://project-tracker-server-sor4.onrender.com/api/cohorts');

        setUsers(usersData);
        setCohorts(cohortsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCohort = async (cohortId) => {
    try {
      await authFetch(`https://project-tracker-server-sor4.onrender.com/api/cohorts/${cohortId}`, {
        method: 'DELETE',
      });
      const updatedCohorts = cohorts.filter(cohort => cohort.id !== cohortId);
      setCohorts(updatedCohorts);
    } catch (error) {
      console.error('Error deleting cohort:', error);
    }
  };

  const handleEditCohort = (cohort) => {
    // Toggle the cohort edit form
    if (selectedCohort && selectedCohort.id === cohort.id) {
      setSelectedCohort(null); // Close the form if the same cohort is selected
    } else {
      setSelectedCohort(cohort);
      setEditCohort({
        name: cohort.name,
        description: cohort.description,
        classes: cohort.classes || [{ name: '', description: '' }]
      });
    }
  };

  const handleUpdateCohort = async (e) => {
    e.preventDefault();
    try {
      const updatedCohort = await authFetch(`https://project-tracker-server-sor4.onrender.com/api/cohorts/${selectedCohort.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCohort)
      });
      const updatedCohorts = cohorts.map(cohort => 
        cohort.id === selectedCohort.id ? updatedCohort : cohort
      );
      setCohorts(updatedCohorts);
      setSelectedCohort(null); // Close the edit form after update
    } catch (error) {
      console.error('Error updating cohort:', error);
    }
  };

  const handleAddCohort = async (e) => {
    e.preventDefault();
    try {
      const addedCohort = await authFetch('https://project-tracker-server-sor4.onrender.com/api/cohorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCohort)
      });
      setNewCohort({
        name: '',
        description: '',
        classes: [{ name: '', description: '' }]
      });
      setCohorts([...cohorts, addedCohort]);
    } catch (error) {
      console.error('Error adding cohort:', error);
    }
  };

  const handleAddClassField = () => {
    setNewCohort({
      ...newCohort,
      classes: [...newCohort.classes, { name: '', description: '' }]
    });
  };

  const handleAddClassFieldToEdit = () => {
    setEditCohort({
      ...editCohort,
      classes: [...editCohort.classes, { name: '', description: '' }]
    });
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  ).slice(0, 7);

  const filteredCohorts = cohorts.filter(cohort =>
    cohort.name.toLowerCase().includes(cohortSearchQuery.toLowerCase()) ||
    cohort.description.toLowerCase().includes(cohortSearchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="user-and-cohort">
          {/* User List Section */}
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

          {/* Add New Cohort Section */}
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

        {/* Cohort List Section */}
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
                      <div>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteCohort(cohort.id)}
                        >
                          Delete Cohort
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditCohort(cohort)}
                        >
                          Edit Cohort
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No cohorts available</p>
                )}
              </ul>
              {/* Edit Cohort Section */}
              {selectedCohort && (
                <div className="collapsible-section">
                  <h2>Edit Cohort</h2>
                  <div className="add-cohort">
                    <form onSubmit={handleUpdateCohort} className="add-cohort-form">
                      <input
                        type="text"
                        placeholder="Cohort Name"
                        value={editCohort.name}
                        onChange={(e) => setEditCohort({ ...editCohort, name: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Cohort Description"
                        value={editCohort.description}
                        onChange={(e) => setEditCohort({ ...editCohort, description: e.target.value })}
                        className="form-input"
                      />
                      
                      <h3>Classes</h3>
                      {editCohort.classes.map((cls, idx) => (
                        <div key={idx} className="class-input-group">
                          <input
                            type="text"
                            placeholder="Class Name"
                            value={cls.name}
                            onChange={(e) => {
                              const newClasses = [...editCohort.classes];
                              newClasses[idx].name = e.target.value;
                              setEditCohort({ ...editCohort, classes: newClasses });
                            }}
                            className="form-input"
                          />
                          <input
                            type="text"
                            placeholder="Class Description"
                            value={cls.description}
                            onChange={(e) => {
                              const newClasses = [...editCohort.classes];
                              newClasses[idx].description = e.target.value;
                              setEditCohort({ ...editCohort, classes: newClasses });
                            }}
                            className="form-input"
                          />
                        </div>
                      ))}
                      <button type="button" onClick={handleAddClassFieldToEdit} className="add-class-btn">Add Another Class</button>
                      <button type="submit" className="submit-btn">Update Cohort</button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
