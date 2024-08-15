import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => (
  <div className="about">
    <Navbar />
    <div className="content">
      <div className="about-info">
        <h2>About Project Tracker</h2>
        <p>
          Project Tracker is a robust tool designed to assist Moringa School students and administrators in managing and tracking their projects effectively. Our platform provides a centralized space where users can add, organize, and monitor the progress of their projects.
        </p>
        <p>
          With Project Tracker, students can stay on top of their assignments, collaborate with peers, and ensure they meet all their deadlines. Administrators have the tools to oversee multiple cohorts and ensure that projects are progressing smoothly.
        </p>
        <p>
          Our mission is to enhance productivity and streamline project management for everyone involved. By offering a user-friendly interface and powerful features, Project Tracker helps students and administrators achieve their goals with confidence.
        </p>
        <p>
          Whether you're managing a single project or overseeing a cohort's progress, Project Tracker is here to make your work easier and more organized.
        </p>
      </div>
    </div>
  </div>
);

export default About;
