import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => (
  <div className="home">
    <Navbar />
    <div className="cards-container">
      <div className="card">
        <h3>Welcome to Our Platform</h3>
        <p>
          Discover the most advanced project management tools designed to help you keep track of your cohorts, classes, and projects with ease.
        </p>
      </div>
      
      <div className="card">
        <h3>Comprehensive Reporting</h3>
        <p>
          Generate detailed reports on project outcomes, class performance, and cohort progress, helping you make informed decisions.
        </p>
      </div>
      <div className="card">
        <h3>Intuitive User Interface</h3>
        <p>
          Our platform is built with simplicity and efficiency in mind, ensuring that you can focus on what matters most—your projects.
        </p>
      </div>
    </div>
  </div>
);

export default Home;
