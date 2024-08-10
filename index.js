import React from 'react';
import ReactDOM from 'react-dom/client';  // Note the different import
import Projects from './components/ProjectCard';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root
root.render(
  <React.StrictMode>
    
    <Login />
    <Projects />
  </React.StrictMode>
);
