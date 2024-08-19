import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Cohorts from './pages/Cohorts';
import Classes from './pages/Classes';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Student from './pages/Student';
import RecentProjectsCarousel from './pages/RecentProjectsCarousel'; // Import the new component
import './App.css';

// ProtectedRoute Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// AdminRoute Component
const AdminRoute = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/" />;
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('https://project-tracker-server-sor4.onrender.com/api/check_admin', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();

          if (response.ok) {
            setIsAuthenticated(true);
            setIsAdmin(data.is_admin);
          } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Update auth state
    setIsAdmin(false); // Reset admin state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        {isAuthenticated && <Sidebar isAdmin={isAdmin} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cohorts" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Cohorts /></ProtectedRoute>} />
            <Route path="/classes/:cohortId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Classes /></ProtectedRoute>} />
            <Route path="/projects/:classId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Projects /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute isAdmin={isAdmin}><Admin /></AdminRoute>} />
            <Route path="/student" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Student /></ProtectedRoute>} />
            <Route path="/recent-projects" element={<RecentProjectsCarousel />} /> {/* New Route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to={isAdmin ? "/admin" : "/"} /> : <Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
