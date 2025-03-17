-- Create database
CREATE DATABASE mobile_app;

-- Use the database
USE mobile_app;

-- Create table
CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL
);
