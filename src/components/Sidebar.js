import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <nav>
      <ul>
        <li><Link to="/"><i class="fa-solid fa-suitcase fa-flip"></i>Dashboard</Link></li>
        <li><Link to="/"><i class="fa-solid fa-briefcase fa-flip"></i>Projects</Link></li>
        <li><Link to="/"><i class="fa-solid fa-users fa-flip"></i>Users</Link></li>
        <li><Link to="/"><i class="fa-solid fa-anchor fa-flip"></i>Cohorts</Link></li>
        <li><Link to="/admin"><i class="fa-solid fa-user-secret fa-flip"></i>Admin</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;