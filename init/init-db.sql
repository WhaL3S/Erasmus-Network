-- Start by creating a database
CREATE DATABASE IF NOT EXISTS testDB;
USE testDB;

-- Create a simple table named `test_table`
CREATE TABLE IF NOT EXISTS test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some initial data into the table
INSERT INTO test_table (name) VALUES ('Alice');
INSERT INTO test_table (name) VALUES ('Bob');
INSERT INTO test_table (name) VALUES ('Charlie');
