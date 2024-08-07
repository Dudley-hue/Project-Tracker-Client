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