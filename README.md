# Task Management System API

A comprehensive RESTful API for managing tasks, built with Node.js. The API supports user authentication, role-based access control (RBAC), task management, and third-party notification integration. It follows industry best practices and includes documentation using the OpenAPI Specification (OAS).

---

## Features

- User Authentication:
    Register, login, and logout functionality with JWT-based authentication.
- Role-Based Access Control (RBAC):
    Three roles: Admin, Manager, and User with different permissions.
- Task Management:
    CRUD operations for tasks, including filtering and sorting.
- Task Assignment:
    Assign tasks to users based on roles.
- Real-Time Updates (Bonus):
    WebSocket notifications for task updates.
- Analytics:
    Task statistics including pending, completed, and overdue tasks.
- Caching:
    Redis-based caching for frequently accessed endpoints.
- Rate Limiting:
    Protection against abuse through endpoint rate limiting.
- Search and Filtering:
    Efficient querying and filtering for tasks based on status, priority, and due date.

---

## Requirements

- Node.js >= 16.x
- MongoDB (Database)
- Redis (for caache & rate limiting)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Task-Management-Api
   npm install
