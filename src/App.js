import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Cohorts from './pages/Cohorts';
import Classes from './pages/Classes';
import Projects from './pages/Projects';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cohorts" element={<Cohorts />} />
            <Route path="/classes/:cohortId" element={<Classes />} />
            <Route path="/projects/:classId" element={<Projects />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
