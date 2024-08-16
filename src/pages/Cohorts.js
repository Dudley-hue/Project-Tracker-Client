import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cohorts.css';
import { authFetch } from '../components/authFetch';

const Cohorts = () => {
  const [cohorts, setCohorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const data = await authFetch('http://127.0.0.1:5000/api/cohorts');
        setCohorts(data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
        navigate('/login'); // Redirect to login if fetch fails
      }
    };

    fetchCohorts();
  }, [navigate]);

  const filteredCohorts = cohorts.filter(cohort =>
    cohort.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cohorts">
      <h2>Cohorts</h2>
      <input
        type="text"
        placeholder="Search cohorts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="project-list">
        {filteredCohorts.map(cohort => (
          <div key={cohort.id} className="cohort-card">
            <Link to={`/classes/${cohort.id}`} className="cohort-card-link">
              <img 
                src={cohort.poster_url} 
                alt={`${cohort.name} poster`} 
                className="cohort-card-image" 
              />
              <div className="cohort-card-content">
                <h3 className="cohort-card-title">{cohort.name}</h3>
                <p className="cohort-card-description">{cohort.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cohorts;
