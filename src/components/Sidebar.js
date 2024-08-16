import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isAdmin }) => (
  <div className="sidebar">
    
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cohorts">Cohorts</Link></li>
        {isAdmin && <li><Link to="/admin">Admin</Link></li>}
        <li><Link to="/student">Student</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;