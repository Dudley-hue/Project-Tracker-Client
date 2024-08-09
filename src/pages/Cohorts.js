import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Cohorts.css';

const Cohorts = () => {
  const [cohorts, setCohorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/cohorts');
  
        if (response.ok) {
          const data = await response.json();
          setCohorts(data);
        } else {
          console.error('Failed to fetch cohorts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };
  
    fetchCohorts();
  }, []);
  
  const filteredCohorts = cohorts.filter(cohort =>
    cohort.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cohorts">
      <h2>Cohorts</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="cohort-list">
        {filteredCohorts.map(cohort => (
          <div key={cohort.id} className="cohort-card">
            <Link to={`/classes/${cohort.id}`}>{cohort.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cohorts;
