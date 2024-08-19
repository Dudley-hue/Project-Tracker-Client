import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { authFetch } from '../components/authFetch';
import './RecentProjectsCarousel.css'; // Ensure you have your styling imported

function RecentProjectsCarousel() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await authFetch('https://project-tracker-server-sor4.onrender.com/api/projects');
        const limitedData = data.slice(0, 20); // Limit the data to 20 items
        setProjects(limitedData);
        setFilteredProjects(limitedData); // Initialize filteredProjects with limited projects
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="carousel-container">
      <h1>Recent Projects</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredProjects.length > 0 ? (
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {filteredProjects.map((project) => (
            <div key={project.id} className="carousel-item">
              <img src={project.poster_url} alt={project.name} />
              <div className="carousel-caption">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No projects found for the search query.</p>
      )}
    </div>
  );
}

export default RecentProjectsCarousel;
