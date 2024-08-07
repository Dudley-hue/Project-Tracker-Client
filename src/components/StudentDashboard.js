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
    

