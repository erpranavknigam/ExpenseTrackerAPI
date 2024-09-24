# Expense Tracker API

-----------------------------------------------------------

## Project URL
[![Project Page](https://img.shields.io/badge/Project%20Page-Click%20Here-brightgreen)](https://roadmap.sh/projects/expense-tracker-api)

## Navigation
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Packages Used](#packages-used)

## Overview

The Expense Tracker API is a RESTful API built with Express.js and MongoDB that allows users to manage their expenses. Users can sign up, log in, and perform CRUD operations on their expenses, including creating, updating, deleting, and fetching expenses with various filters.

## Features

- User Authentication
  - Signup and login functionality
  - JSON Web Token (JWT) for secure authentication
- Expense Management
  - Create, update, delete, and retrieve expenses
  - Filter expenses by date range and category (week, month and 3months)

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- dotenv (for environment variable management)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or cloud instance)
- A code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/erpranavknigam/ExpenseTrackerAPI.git
   ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Change .env file according to your requirements:
    ```bash
    PORT=5000
    SECRET_KEY=your_secret_key
    MONGODB_URI=your_mongodb_connection_string
    ```

## Running the Application
1. Start the server:
    ```bash
    npm start
    ```
2. The API will be available at http://localhost:5000

## API Endpoints

### Authentication(/api/v1/auth)

1. POST /signup

* Request body: 
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

* Response:
```json 
{ "message": "User Created Successfully", "token": "your_jwt_token" }
```


2. POST /login

* Request body: 
```json
{ "email": "string", "password": "string" }
```
* Response: 
```json
{ "message": "User Logged in Successfully", "token": "your_jwt_token", "user": {...} }
```

### Expenses(/api/v1/expense)

All expense-related endpoints require an authorization header with the JWT token.

1. POST /create

* Request body: 
```json
{ "amount": "number", "category": "string" }
```
* Response: 
```json 
{ "message": "Expenses added successfully" }
```

2. POST /get

* Query parameters: `filter`, `startDate`, `endDate`
* Response: `[ { ...expense objects... } ]` 

3. POST /remove/:id

* Response: 
```json
{ "message": "Expense deleted successfully" }
```

4. POST /update/:id

* Request body: 
```json
{ "amount": "number", "category": "string" }
```
* Response: 
```json
{ "message": "Expense Updated Successfully", "exp": {...} }
```

## Packages Used

* "bcrypt": "^5.1.1",
* "dotenv": "^16.4.5",
* "express": "^4.21.0",
* "jsonwebtoken": "^9.0.2",
* "mongoose": "^8.6.3",
* "nodemon": "^3.1.7"
