# Architecture

## Architecture Style

The application follows a layered architecture.

Client (React)
│
▼
REST Controller
│
▼
Service Layer
│
▼
Repository Layer
│
▼
PostgreSQL Database

---

## Backend Layers

### Controller

Handles HTTP requests and responses.

### Service

Contains business logic.

### Repository

Handles database operations using Spring Data JPA.

### Database

Stores users and vehicle inventory.

---

## Authentication

JWT-based authentication is used to secure protected APIs.

Role-based authorization is used to restrict administrative operations.

---

## Technology Stack

Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA

Frontend

- React

Database

- PostgreSQL

Testing

- JUnit 5
- Mockito

Version Control

- Git