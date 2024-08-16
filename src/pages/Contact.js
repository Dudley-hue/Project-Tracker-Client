import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css'; // Reuse the existing CSS for styling

const Contact = () => (
  <div className="home">
    <Navbar />
    <div className="content">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Phone number: +380 73 103 07 25</p>
        <p>Email: info@artedante.com</p>
      </div>
    </div>
  </div>
);

export default Contact;
