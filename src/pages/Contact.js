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

      <div className="contact-form">
        <h2>Leave Your Contact Info – Hear From Us the Same Day!</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="phone">Phone number:</label>
          <input type="text" id="phone" name="phone" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
