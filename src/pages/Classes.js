import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Classes.css';

const classesData = {
  1: [
    { id: 1, name: 'Romans' },
    { id: 2, name: 'Supremes' },
  
    // Add more classes for SDFT09 as needed
  ],
  2: [
    { id: 3, name: 'Cyborgs' },  // Placeholder classes for SDFT08
    { id: 4, name: 'Androids' },
    // Add more classes for SDFT08 as needed
  ]
};

const Classes = () => {
  const { cohortId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const cohortClasses = classesData[cohortId] || [];

  const filteredClasses = cohortClasses.filter(class_ =>
    class_.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classes">
      <h2>Classes in Cohort {cohortId}</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="class-list">
        {filteredClasses.map(class_ => (
          <div key={class_.id} className="class-card">
            <Link to={`/projects/${class_.id}`}>{class_.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
