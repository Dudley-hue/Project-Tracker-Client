import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Cohorts.css';

const cohorts = [
  { id: 1, name: 'SDFT09' },
  { id: 2, name: 'SDFT08' },
  // Add more cohorts as needed
];

const Cohorts = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
