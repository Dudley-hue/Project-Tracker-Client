import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Classes.css';
import { authFetch } from '../components/authFetch';

const Classes = () => {
  const { cohortId } = useParams(); // Get cohort ID from URL
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await authFetch(`http://127.0.0.1:5000/api/classes?cohort_id=${cohortId}`);
        setClasses(data);
      } catch (error) {
        setError('Failed to fetch classes.');
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [cohortId]);

  const filteredClasses = classes.filter(class_ =>
    class_.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classes">
      <h2>Classes in Cohort {cohortId}</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <p className="error-message">{error}</p>}
      <div className="class-list">
        {filteredClasses.map(class_ => (
          <div key={class_.id} className="class-card">
            <Link to={`/projects/${class_.id}`}>
              <img src={class_.poster_url} alt={`${class_.name} poster`} className="class-poster" />
              <div className="class-name">{class_.name}</div>
              <p className="class-description">{class_.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
