# Car Dealership Inventory System

A full-stack Car Dealership Inventory System built using **Spring Boot**, **React**, **PostgreSQL**, and **Test-Driven Development (TDD)**.

---

# Project Goal

Build a secure and maintainable inventory management system that allows users to browse, search, purchase, and manage dealership inventory.

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate
* Bean Validation
* PostgreSQL
* Lombok
* JWT Authentication

## Frontend

* React
* Axios
* React Router

## Database

* PostgreSQL

---

# Development Methodology

This project follows:

* Test Driven Development (TDD)
* Red → Green → Refactor
* SOLID Principles
* Clean Architecture
* Meaningful Git Commits

---

# Features

## Authentication

* User Registration
* User Login
* BCrypt Password Encryption
* JWT Token Generation

---

## Vehicle Management

* Add Vehicle
* Get All Vehicles
* Get Vehicle By ID
* Update Vehicle
* Delete Vehicle

---

## Vehicle Search

* Search by Make
* Search by Model
* Search by Category
* Search by Price Range

---

## Inventory Management

* Purchase Vehicle
* Restock Vehicle

---

## Validation

* Request Validation
* Global Exception Handling
* Custom Business Exceptions

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

---

## Vehicles

POST /api/vehicles

GET /api/vehicles

GET /api/vehicles/{id}

PUT /api/vehicles/{id}

DELETE /api/vehicles/{id}

GET /api/vehicles/search

---

## Inventory

POST /api/vehicles/{id}/purchase

POST /api/vehicles/{id}/restock

---

# Project Structure

auth

* controller
* dto
* entity
* repository
* security
* service
* exception

vehicle

* controller
* dto
* entity
* repository
* service
* exception

---

# Running the Backend

## Clone Repository

git clone <repository-url>

## Database

Create a PostgreSQL database.

Update application.properties.

## Build

mvn clean install

## Run

mvn spring-boot:run

---

# Running the Frontend

cd frontend

npm install

npm run dev

---

# Testing

Run all tests

mvn clean test

The backend includes:

* Service Tests
* Controller Tests
* Validation Tests
* Exception Handling Tests

---

# Future Improvements

The following were intentionally postponed due to the assignment timeline:

* JWT Authentication Filter
* Role-Based Authorization
* AuthenticationManager based login
* Docker Deployment
* CI/CD Pipeline

---

# My AI Usage

AI Tools Used

* ChatGPT

How AI was Used

* Generated initial boilerplate.
* Designed REST endpoints.
* Assisted in writing unit tests.
* Assisted with controller tests.
* Suggested exception handling.
* Helped review code for TDD compliance.
* Assisted with README documentation.

Reflection

AI significantly accelerated repetitive development tasks such as generating boilerplate, writing tests, and reviewing code. All generated code was reviewed, integrated, and adapted manually to fit the project architecture and assignment requirements.

---

# License

This project was developed for the Incubytes TDD Assessment.
