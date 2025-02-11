# Work_india_Assignment_21CS3036
Railway Management System

# Problem Statement

To create a railway management system similar to IRCTC. Users should be able to:

Check train availability between two stations.

View available seats for a train.

Book seats if available after logging in.

The system must handle multiple users booking seats simultaneously, preventing double booking (race conditions). The code should be optimized for real-time performance and high traffic.

# Project Overview

This system allows users to register, check train availability, and book seats. 

Admins can manage trains and seat availability. 

The backend is built with Node.js, Express.js, and MySQL.

# Features

User Registration & Login

JWT Authentication for secure access

Train Availability Check

Seat Booking with Race Condition Handling

Admin Functions: Add/update train details

Role-Based Access Control (Admin/User)

Error Handling & Input Validation

# Prerequisites

Ensure you have the following installed:

Node.js (v14 or later)

MySQL (Database setup required)

Postman (for API testing)

# Environment Setup

Create a .env file in the project root and add:

PORT=3000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=irctc_db

JWT_SECRET=your_jwt_secret

API_KEY=your_admin_api_key


# Installation

Clone the repository and install dependencies:
https://github.com/priyanshu07s/Work_india_Assignment_21CS3036.git


npm install

# Set up the MySQL database:

CREATE DATABASE irctc_db;

USE irctc_db;

CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   
   name VARCHAR(255) NOT NULL,
   
   email VARCHAR(255) UNIQUE NOT NULL,
   
   password VARCHAR(255) NOT NULL,
   
   role ENUM('user', 'admin') DEFAULT 'user',
   
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   
);

CREATE TABLE trains (
   id INT AUTO_INCREMENT PRIMARY KEY,
   
   train_number VARCHAR(50) NOT NULL,
   
   source VARCHAR(255) NOT NULL,
   
   destination VARCHAR(255) NOT NULL,
   
   total_seats INT NOT NULL,
   
   available_seats INT NOT NULL,
   
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   
);

CREATE TABLE bookings (
   id INT AUTO_INCREMENT PRIMARY KEY,
   
   user_id INT,
   
   train_id INT,
   
   seats INT NOT NULL,
   
   FOREIGN KEY (user_id) REFERENCES users(id),
   
   FOREIGN KEY (train_id) REFERENCES trains(id)
   
);

# Running the Server

Start the server with:

npm start

Default API URL: http://localhost:3000

# API Endpoints

User Routes

Register

POST /user/register

Request Body:

{"name": "John Doe", "email": "john@example.com", "password": "password"}

Login

POST /user/login

Request Body:

{"email": "john@example.com", "password": "password"}

Check Train Availability

GET /user/availability?source=Ranchi&destination=Delhi

Response:

{"available": true, "availableTrainCount": 1, "trains": [{"trainNumber": "123123", "availableSeats": 600}]}

Book Seats (Requires JWT Authentication)

POST /user/book

Request Body:

{"trainId": 1, "seatsToBook": 2}

Response:

{"message": "Seats booked successfully"}

View Bookings

GET /user/getAllbookings

Response:

[{"booking_id": 17, "number_of_seats": 50, "train_number": "123123", "source": "Ranchi", "destination": "Delhi"}]

Admin Routes (Require API Key in Headers: x-api-key)

Add a Train

POST /admin/addTrain

Response:

{"message": "Train added successfully", "trainIds": [{"trainNumber": "172622", "trainId": 21}]}

Update Seat Availability

PUT /admin/update-seats/10

Request Body:

{"totalSeats": 200, "availableSeats": 150}

Response:

{"message": "Seats updated successfully"}

Running Tests

Use Postman to test API endpoints.

Sample Train Data

[
  {"trainNumber": "123123", "source": "Gorakhpur", "destination": "Bengaluru", "totalSeats": 300},
  {"trainNumber": "124124", "source": "Gorakhpur", "destination": "Bengaluru", "totalSeats": 350},
  {"trainNumber": "125125", "source": "Gorakhpur", "destination": "Bengaluru", "totalSeats": 400}
]

# Technologies Used

Node.js - Backend logic

Express.js - Web framework

MySQL - Database

JWT - Authentication

bcrypt - Password hashing

dotenv - Manage environment variables

# Future Improvements for this project 

Add frontend (React/Angular)

Implement seat selection

Send booking confirmation emails

Integrate payment gateway


