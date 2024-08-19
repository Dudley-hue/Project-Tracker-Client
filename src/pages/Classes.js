import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './Classes.css'; // Ensure this CSS file is created and used
import { authFetch } from '../components/authFetch';

const Classes = () => {
  const { cohortId } = useParams(); // Get cohort ID from URL
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await authFetch(`https://project-tracker-server-sor4.onrender.com/api/classes?cohort_id=${cohortId}`);
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
            <Link to={`/projects/${class_.id}`} className="class-card-link">
              <img src={class_.poster_url} alt={`${class_.name} poster`} className="class-card-image" />
              <div className="class-card-content">
                <h3 className="class-card-title">{class_.name}</h3>
                <p className="class-card-description">{class_.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
