import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isAdmin }) => (
  <div className="sidebar">
    
    <nav>
      <ul>
        {/* <li><Link to="/"><i class="fa-solid fa-suitcase fa-flip"></i>Home</Link></li> */}
        <li><Link to="/cohorts"><i class="fa-solid fa-users-rays fa-flip"></i>Cohorts</Link></li>
        {isAdmin && <li><Link to="/admin"><i class="fa-solid fa-user-secret fa-flip"></i>Admin</Link></li>}
        <li><Link to="/student"><i class="fa-solid fa-users fa-flip"></i>Student</Link></li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;