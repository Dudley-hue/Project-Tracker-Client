# Project Tracker Platform

#### Date:  August 12, 2024

#### Team Members: SEDLY KEITH, BRENDA CHEPTOO, BRIAN MAITHO, JOEL LANGAT, DUDLEY ANTONY,VICTOR KEMBOI

## Introduction
### Overview
This project is a Project Tracker platform designed to help students and administrators at Moringa School keep track of projects done over time. The platform allows students to add, manage, and collaborate on projects while administrators manage cohorts and projects. It includes functionalities for user authentication, project management, and collaboration.

## Key Features

- **User Authentication**: Users can sign up and log in to access their personalized dashboard.
- **Project Management**: Users can add new projects, view existing projects, and manage them in the "My Projects" section.
- **Project Collaboration**: Users can collaborate on projects by adding group members.
- **Admin Management**: Admins can manage cohorts, add or delete projects, and oversee the overall project tracking.

### User Authentication
User authentication allows students and administrators to securely sign up and log in to access their dashboards. This includes creating an account with a username, email, and password, followed by secure login. Password hashing and email verification ensure that user data is secure and only authorized users can manage projects and cohorts.

### Project Management
Project management enables users to add new projects with details like project name, description, GitHub link, and team members. Users can also view and manage their existing projects. This feature provides a comprehensive view of ongoing and past projects, helping students organize their work and collaborate effectively.

### Project Collaboration
Collaboration features allow users to add team members to their projects, fostering teamwork and shared ownership. This ensures that all group members can contribute and manage the project together, enhancing collaboration and project success.

### Admin Management
Admins have access to tools for managing cohorts and projects. They can add new cohorts, delete existing ones, and manage all projects under each cohort. This feature allows administrators to maintain an organized project repository and ensure that the platform is up-to-date.

## Directory Structure

The project follows a typical full-stack structure with separate directories for the frontend and backend code.

## Directory Structure

The project follows a typical full-stack structure with separate directories for the frontend and backend code.


.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py


## Technologies used
React.js
Python
Flask 
JWT
CSS
SQLITE

 ## Backend Setup

 ### Navigate to the server directory 
 cd server/backend

 ### Install dependencies
 pipenv install
 pipenv shell

 ### Run the flask server
 python app.py


 ## Frontend Setup

 ### Navigate to the client directory
 cd client 

 ### Install dependencies
 npm install --prefix client

 ### Run the React application
 npm start --prefix client

  ## Database Setup
 ### Database Initialization

#### Navigate to the server directory
cd server

#### Initialize the database
 flask db init

#### Create the initial database migration
flask db migrate -m "Initial migration"

#### Apply the migration to the database
flask db upgrade

#### Check the new directory structure
tree -L 2

## Support and Contact Details
For any questions, feedback, or support inquiries, please don't hesitate to reach out to us via:

GitHub: bmaitho,Brenda Cheptoo525,Dudley-hue,Joel Langat,seed3saaho and Victor Kemboi.
Email: info@Project-Tracker-Platform.com

Thank you for choosing Project-Tracker-Platform.
### License
The content of this site is licensed under the MIT license
Copyright (c) 2024.