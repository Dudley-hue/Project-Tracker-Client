import React from 'react';
import Navbar from './components/Navbar';
import './About.css';

const About = () => (
  <div className="about-page">
    <Navbar />
    <div className="about-content">
      <h1>About Us</h1>
      <p>
        Welcome to our project tracking website! We are committed to providing a powerful and intuitive platform for managing projects, cohorts, and classes.
        Whether you're a student or an administrator, our tool is designed to help you stay organized, collaborate efficiently, and track progress with ease.
      </p>
      <p>
        Our mission is to empower individuals and organizations to achieve their goals by providing them with the right tools for project management.
        From creating and managing projects to assigning tasks and tracking milestones, we've got you covered.
      </p>
      <p>
        Our team consists of dedicated professionals passionate about making project management seamless and accessible for everyone.
        We continuously strive to improve our platform to meet your evolving needs. Join us on this journey to make project tracking simple, effective, and fun!
      </p>
    </div>
  </div>
);

export default About;
