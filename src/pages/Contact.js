import React from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

const Contact = () => (
  <div className="contact-container">
    <Navbar />
    <div className="contact-card">
      <h1>Contact Us</h1>
      <p>If you have any questions, suggestions, or feedback, feel free to reach out to us. We're here to help!</p>
      <p>Email: support@example.com</p>
      <p>Phone: +123 456 7890</p>
    </div>
  </div>
);

export default Contact;
