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
      
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Phone number: +380 73 103 07 25</p>
        <p>Email: info@artedante.com</p>
      </div>

      <div className="contact-form">
        <h2>Leave Your Contact Info – Hear From Us the Same Day!</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="phone">Phone number:</label>
          <input type="text" id="phone" name="phone" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
);

export default Home;
