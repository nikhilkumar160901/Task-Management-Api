# Task Management System API

## Objective
Develop a comprehensive RESTful API for a task management system using Node.js, implementing user authentication, role-based access control, task management, and integration with a third-party notification service.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Advanced Features](#advanced-features)
- [Security Measures](#security-measures)
- [Usage](#usage)
- [License](#license)

---

## Features
1. **User Authentication**
   - Registration with email validation and password criteria.
   - JWT-based authentication.
   - Secure logout.

2. **Role-Based Access Control (RBAC)**
   - Admin, Manager, and User roles with varying permissions.

3. **Task Management**
   - Create, Read, Update, and Delete tasks.
   - Assign tasks to users.

4. **Real-Time Notifications**
   - Use Socket.io for real-time task updates.

5. **Analytics**
   - Task statistics (completed, pending, overdue).

6. **Caching**
   - Redis-based caching for performance optimization.

7. **Rate Limiting**
   - Prevent brute-force attacks and abuse.

8. **Search and Filtering**
   - Advanced filtering for tasks by status, priority, and due date.

---

## Tech Stack
- **Node.js** (Express.js Framework)
- **MongoDB** (Database)
- **JWT** (Authentication)
- **Socket.io** (Real-time Updates)
- **Redis** (Caching)

---

## Installation

1. Clone the repository:
```bash
  git clone https://github.com/username/task-management-api.git
```
2. Navigate to the project directory:
```bash
  cd task-management-api
```
3. Install dependencies:
```bash
  npm install
```
4. Start the server:
```bash
  npm start
```

---

## Environment Variables
Create a `.env` file and configure the following variables:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your_jwt_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_email_user
SMTP_PASS=your_email_password
EMAIL_FROM=your_email
```

---

## API Endpoints

### 1. User Authentication
| Endpoint         | Method | Description                                |
|------------------|--------|--------------------------------------------|
| /api/auth/register | POST   | Register a new user.                       |
| /api/auth/login  | POST   | Login and receive a JWT token.             |
| /api/auth/logout | POST   | Log out the current user.                   |

### 2. User Profile
| Endpoint             | Method | Description                                     |
|----------------------|--------|-------------------------------------------------|
| /api/users/profile   | GET    | Retrieve profile details of authenticated user. |

### 3. Task Management
| Endpoint           | Method | Description                                               |
|--------------------|--------|-----------------------------------------------------------|
| /api/tasks         | POST   | Create a new task.                                       |
| /api/tasks         | GET    | Retrieve all tasks (filtering supported).                |
| /api/tasks/:id     | PUT    | Update an existing task.                                 |
| /api/tasks/:id     | DELETE | Delete a specific task.                                  |

### 4. Task Assignment
| Endpoint                      | Method | Description                                      |
|-------------------------------|--------|--------------------------------------------------|
| /api/tasks/assign             | POST   | Assign a task to a user.                         |
| /api/tasks/view               | GET    | Retrieve tasks assigned to a user.               |

---

## Advanced Features
1. **Real-Time Updates**
   - Socket.io integration for instant task updates.
2. **Analytics**
   - Track tasks completed, pending, and overdue by users and teams.
3. **Caching**
   - Redis caching to reduce database load for frequently accessed endpoints.
4. **Rate Limiting**
   - Protect API with rate limits.
5. **Search and Filtering**
   - Query tasks efficiently with filters.

---

## Security Measures
1. **Authentication**
   - JWT tokens with expiry.
2. **Password Encryption**
   - Hashing using bcrypt.
3. **Input Validation**
   - Joi for validating inputs.
4. **Rate Limiting**
   - Prevent brute-force attacks.

---

## License
This project is licensed under the MIT License. Feel free to modify and distribute the code.

---

## Author
Developed by Nikhil Kumar. Contact: nikhilkumar.230816@gmail.com

