import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => (
  <div className="home">
    <Navbar />
    <div className="content">
      <div className="project-info">
        <h2>Project Tracker</h2>
        <p>
          Welcome to Project Tracker, a comprehensive tool designed to help Moringa School students keep track of their projects. Whether you're a student managing your own work or an admin overseeing multiple cohorts, Project Tracker offers all the features you need to stay organized and on top of your projects.
        </p>
        <p>
          With Project Tracker, you can:
        </p>
        <ul>
          <li>Add and manage projects with detailed information.</li>
          <li>Track project progress and milestones.</li>
          <li>Organize and collaborate with group members.</li>
          <li>Filter and search through projects by various criteria.</li>
        </ul>
      </div>
      </div>
  </div>
);

export default Home;
