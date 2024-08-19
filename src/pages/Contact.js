import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Contact = () => (
  <div className="home">
    <Navbar />
    <div className="content">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>Phone number: +254743061477</p>
        <p>Email: langatjoel42@gmail</p>
        <a
          href="mailto:langatjoel42@gmail.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
          className="email-link"
        >
          Send an Email
        </a>
      </div>
    </div>
  </div>
);

export default Contact;
