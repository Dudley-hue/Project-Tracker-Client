import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cohortService from '../services/cohortService';

const StudentDashboard = () => {
    const [cohorts, setCohorts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedCohort, setSelectedCohort] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredCohorts, setFilteredCohorts] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCohorts();
        fetchSessionData();
    }, []);

    useEffect(() => {
        if (selectedCohort) {
            fetchClasses(selectedCohort.id);
        }
    }, [selectedCohort]);

    useEffect(() => {
        if (selectedClass) {
            fetchProjects(selectedClass.id);
        }
    }, [selectedClass]);

    const fetchCohorts = async () => {
        try {
            const response = await cohortService.getAllCohorts();
            setCohorts(response.data);
            setFilteredCohorts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSessionData = async () => {
        try {
            const response = await cohortService.getSessionData();
            if (response.data) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchClasses = async (cohortId) => {
        try {
            const response = await cohortService.getClassesByCohortId(cohortId);
            setClasses(response.data);
            setFilteredClasses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjects = async (classId) => {
        try {
            const response = await cohortService.getProjectsByClassId(classId);
            setProjects(response.data);
            setFilteredProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCohortSelect = (cohort) => {
        setSelectedCohort(cohort);
    };

    const handleClassSelect = (classObj) => {
        setSelectedClass(classObj);
    };

    const handleProjectSelect = (project) => {
        navigate(`/project/${project.id}`);
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        if (event.target.value === "") {
            setFilteredCohorts(cohorts);
            setFilteredClasses(classes);
            setFilteredProjects(projects);
        } else {
            const filteredCohorts = cohorts.filter((cohort) =>
                cohort.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            const filteredClasses = classes.filter((classObj) =>
                classObj.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            const filteredProjects = projects.filter((project) =>
                project.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredCohorts(filteredCohorts);
            setFilteredClasses(filteredClasses);
            setFilteredProjects(filteredProjects);
        }        
    };

    const handleCohortClick = (cohort) => {
        setSelectedCohort(cohort);
        setSelectedClass(null);
        setFilteredClasses(classes.filter((classObj) => classObj.cohortId === cohort.id));
        setFilteredProjects(projects.filter((project) => project.classId === cohort.classId));
        setSearchValue("");
    };

    const handleClassClick = (classObj) => {
        setSelectedClass(classObj);
        setFilteredProjects(projects.filter((project) => project.classId === classObj.id));
        setSearchValue("");
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        navigate(`/project/${project.id}`);

    };
    const handleBack = () => {
        if (selectedProject){
            setSelectedProject(null);
            setSelectedClass(null);
            setSearchValue("");

        } else if (selectedClass) {
            setSelectedClass(null);
            setSearchValue("");
        } else if (selectedCohort) {
            setSelectedCohort(null);
            setSearchValue("");
        }
    };
    
    return (
        <div>
            <h1>Student Dashboard</h1>
            <input type="text" placeholder="Search" value={searchValue} onChange={handleSearch} />
            {
                loggedIn ? (
                    <>
                    {!selectedCohort && !selectedClass && !selectedProject && (
                        <div className="cohorts-container">
                            {filteredCohorts.map((cohort) => (
                                <div key={cohort.id} className="cohort-card">
                                    <h2>{cohort.name}</h2>
                                    <button onClick={() => handleCohortClick(cohort)}>View Classes</button>
                                
                                </div>
                            ))}
                        </div>
                    )}

            {selectedCohort && !selectedClass && !selectedProject && (
                <div>
                    <button onclick={handleBack}>Back to Cohorts</button>
                    <h2>Classes in {selectedCohort.name}</h2>
                    <div className="classes-container">
                        {filteredClasses.map((classObj) => (
                            <div key={classObj.id} className="class-card">
                                <h3>{classObj.name}</h3>
                                <button onClick={() => handleClassClick(classObj)}>View Projects</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {
                selectedClass && !selectedProject && (
                    <div>
                        <button onclick={handleBack}>Back to Classes</button>
                        <h2>Projects in {selectedClass.name}</h2>
                        <div className="projects-container">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <h3>{project.name}</h3>
                                    <button onClick={() => handleProjectClick(project)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {
                selectedProject && (
                    <div>
                        <button onclick={handleBack}>Back to Projects</button>
                        <h2>Project Details</h2>
                        <div className="project-details">
                            <p>Name: {selectedProject.name}</p>
                            <p>Description: {selectedProject.description}</p>
                            <p>Class: {selectedProject.classId}</p>
                            <p><strong>Github Link:</strong> <a href={selectedProject.githubLink}>{selectedProject.githubLink}</a></p>
                            <p><strong>Members:</strong></p>
                            <ul>
                                {selectedProject.members.map((member) => (
                                    <li key={member.id}>{member.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
            </>
                ) : (
                    <p>Please log in</p>
                )
            }
        </div>
    );  
};

export default StudentDashboard;
                            
                                
               