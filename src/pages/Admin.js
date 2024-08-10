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
  