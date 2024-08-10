import React, { useState, useEffect } from 'react';
import './Admin.css';

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
          classId: '',
          posterUrl: ''
        });
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };
  