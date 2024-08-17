import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => (
  <div className="about">
    <Navbar />
    <div className="content">
      <div className="about-info">
        <p>
          Welcome to Project Tracker, a comprehensive tool designed to help Moringa School students keep track of their projects. Whether you're a student managing your own work or an admin overseeing multiple cohorts, Project Tracker offers all the features you need to stay organized and on top of your projects.
        </p>
        <p>
          With Project Tracker, you can:
        </p>
        <div className="about-info-paragraphs">
          <p className="info-paragraph">- Add and manage projects with detailed information.</p>
          <p className="info-paragraph">- Track project progress and milestones.</p>
          <p className="info-paragraph">- Organize and collaborate with group members.</p>
          <p className="info-paragraph">- Filter and search through projects by various criteria.</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
