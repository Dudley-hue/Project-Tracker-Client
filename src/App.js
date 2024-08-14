import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Cohorts from './pages/Cohorts';
import Classes from './pages/Classes';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/api/check_admin', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          console.log('User is authenticated and role checked');
          setIsAuthenticated(true);
          setIsAdmin(data.is_admin);
        } else {
          console.log('User is not authenticated or admin check failed');
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/cohorts" element={<Cohorts />} />
            <Route path="/classes/:cohortId" element={<Classes />} />
            <Route path="/projects/:classId" element={<Projects />} />
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/home" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
