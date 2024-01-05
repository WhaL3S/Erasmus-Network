-- Create DB
CREATE DATABASE IF NOT EXISTS erasmus;
USE erasmus;

DROP TABLE IF EXISTS LogUniversity;
DROP TABLE IF EXISTS Evaluation;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Resume;
DROP TABLE IF EXISTS Chat;
DROP TABLE IF EXISTS University_Representative;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS File;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Action;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS University;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Client;

CREATE TABLE Client (
    name VARCHAR(255),
    id_Client INT AUTO_INCREMENT,
    PRIMARY KEY(id_Client)
);

CREATE TABLE Reservation (
    start_date DATE,
    end_date DATE,
    id_Reservation INT AUTO_INCREMENT,
    PRIMARY KEY(id_Reservation)
);

CREATE TABLE University (
    name VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    address VARCHAR(255),
    rating DOUBLE PRECISION,
    id_University INT AUTO_INCREMENT,
    PRIMARY KEY(id_University)
);

CREATE TABLE User (
    name VARCHAR(255) NULL,
    surname VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_User INT AUTO_INCREMENT,
    PRIMARY KEY(id_User)
);


CREATE TABLE Action (
    device VARCHAR(255),
    dateTime DATETIME,
    location VARCHAR(255),
    id_Action INT AUTO_INCREMENT,
    fk_Userid_User INT NOT NULL,
    PRIMARY KEY(id_Action),
    CONSTRAINT tracks FOREIGN KEY(fk_Userid_User) REFERENCES User(id_User)
);

CREATE TABLE Course (
    name VARCHAR(255),
    semester VARCHAR(255),
    credits INT,
    description VARCHAR(255),
    module_code VARCHAR(255),
    degree VARCHAR(255),
    study_format VARCHAR(255),
    faculty VARCHAR(255),
    id_Course INT AUTO_INCREMENT,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_Course),
    CONSTRAINT provides FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE File (
    url VARCHAR(255),
    title VARCHAR(255),
    file_type VARCHAR(255),
    dateTime DATETIME,
    size FLOAT,
    id_File INT AUTO_INCREMENT,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_File),
    CONSTRAINT uploads_File FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE Student (
    passport_id VARCHAR(255),
    phone_number VARCHAR(255),
    linkedin_profile VARCHAR(255),
    id_User INT NOT NULL,
    PRIMARY KEY(id_User),
    FOREIGN KEY(id_User) REFERENCES User(id_User)
);

CREATE TABLE University_Representative (
    position VARCHAR(255),
    department VARCHAR(255),
    id_User INT NOT NULL,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_User),
    CONSTRAINT part_of FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University),
    FOREIGN KEY(id_User) REFERENCES User(id_User)
);

CREATE TABLE Chat (
    name VARCHAR(255),
    id_Chat INT AUTO_INCREMENT,
    fk_Userid1_User INT NOT NULL,
    fk_Userid2_User INT NOT NULL,
    PRIMARY KEY(id_Chat),
    CONSTRAINT creates FOREIGN KEY(fk_Userid1_User) REFERENCES User(id_User),
    CONSTRAINT belongs FOREIGN KEY(fk_Userid2_User) REFERENCES User(id_User)
);

CREATE TABLE Resume (
    url VARCHAR(255),
    title VARCHAR(255),
    file_type VARCHAR(255),
    dateTime DATETIME,
    size FLOAT,
    id_Resume INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    PRIMARY KEY(id_Resume),
    CONSTRAINT uploads_Resume FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User)
);

CREATE TABLE Review (
    text VARCHAR(255),
    timeCreated DATE,
    rating INT,
    id_Review INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_Review),
    CONSTRAINT leaves FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User),
    CONSTRAINT displayed FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE Application (
    motivation_letter VARCHAR(255),
    status VARCHAR(255),
    dateTime DATETIME,
    id_Application INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    fk_Resumeid_Resume INT NOT NULL,
    fk_Courseid_Course INT NOT NULL,
    PRIMARY KEY(id_Application),
    CONSTRAINT creates_Application FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User),
    CONSTRAINT attached_to_Application FOREIGN KEY(fk_Resumeid_Resume) REFERENCES Resume(id_Resume),
    CONSTRAINT applies_to_Application FOREIGN KEY(fk_Courseid_Course) REFERENCES Course(id_Course)
);

CREATE TABLE Message (
    text VARCHAR(255),
    timeSent DATE,
    attachment BLOB,
    attachmentName VARCHAR(255),
    id_Message INT AUTO_INCREMENT,
    fk_Chatid_Chat INT NOT NULL,
    fk_Userid_User INT NOT NULL,
    PRIMARY KEY(id_Message),
    CONSTRAINT write_Message FOREIGN KEY(fk_Chatid_Chat) REFERENCES Chat(id_Chat),
    CONSTRAINT belongs_to_Message FOREIGN KEY(fk_Userid_User) REFERENCES User(id_User)
);

CREATE TABLE Evaluation (
    reason VARCHAR(255),
    dateTime DATETIME,
    id_Evaluation INT AUTO_INCREMENT,
    fk_University_representativeid_User INT NOT NULL,
    fk_Applicationid_Application INT NOT NULL,
    PRIMARY KEY(id_Evaluation),
    UNIQUE(fk_Applicationid_Application),
    CONSTRAINT provides_Evaluation FOREIGN KEY(fk_University_representativeid_User) REFERENCES University_Representative(id_User),
    CONSTRAINT evaluates_Evaluation FOREIGN KEY(fk_Applicationid_Application) REFERENCES Application(id_Application)
);

CREATE TABLE LogUniversity (
    id INT AUTO_INCREMENT,
    universityId INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(universityId) REFERENCES University(id_University) ON DELETE CASCADE
);

-- INITIAL DATA FOR TESTING
INSERT INTO Client (name) VALUES 
('John Doe'), 
('Jane Smith'),
('Alice Johnson');

INSERT INTO University (name, country, city, address, rating) VALUES 
('Harvard University', 'USA', 'Cambridge', '123 Tech Street', 4.5),
('KTU', 'Lithuania', 'Kaunas', '456 Old Road', 4.2),
('University of Waterloo', 'Canada', 'Waterloo', '789 New Way', 4.7),
('VU', 'Lithuania', 'Vilnius', 'New road 654', 2.4);

INSERT INTO User (name, surname, email, login, password) VALUES 
('Emily', 'Brown', 'emily.brown@email.com', 'emilyb', 'pass123'), 
('David', 'Wilson', 'david.wilson@email.com', 'davidw', 'pass456'),
('Sophia', 'Martinez', 'sophia.martinez@email.com', 'sophiam', 'pass789'),
('Michael', 'Roberts', 'michael.roberts@univmail.com', 'mroberts', 'pass1234'),
('Sarah', 'Johnson', 'sarah.johnson@univmail.com', 'sjohnson', 'pass5678');

INSERT INTO Student (passport_id, phone_number, linkedin_profile, id_User) VALUES 
('AB123456', '123-456-7890', 'linkedin.com/in/emilybrown', 1),
('CD789012', '234-567-8901', 'linkedin.com/in/davidwilson', 2),
('EF345678', '345-678-9012', 'linkedin.com/in/sophiamartinez', 3);

INSERT INTO Course (name, semester, credits, description, module_code, degree, study_format, faculty, fk_Universityid_University) VALUES 
('Introduction to Computer Science', 'Fall 2024', 4, 'Basic concepts of computing', 'CS101', 'BSc', 'Full-time', 'Computer Science', 1),
('Modern Art History', 'Spring 2024', 3, 'Study of modern art movements', 'ART102', 'BA', 'Part-time', 'Arts', 2);

INSERT INTO University_Representative (position, department, id_User, fk_Universityid_University) VALUES 
('Admissions Officer', 'Admissions', 4, 1),
('Department Head', 'Computer Science', 5, 1);

INSERT INTO Chat (name, fk_Studentid_User, fk_Universityid_University) VALUES 
('Erasmus Chat 1', 1, 1),
('Erasmus Chat 2', 2, 1);

INSERT INTO Resume (url, title, file_type, dateTime, size, fk_Studentid_User) VALUES 
('http://example.com/resumes/emily.pdf', 'Emily Brown Resume', 'PDF', '2024-01-10 09:00:00', 500.0, 1),
('http://example.com/resumes/david.pdf', 'David Wilson Resume', 'PDF', '2024-01-11 10:00:00', 450.0, 2);

INSERT INTO Review (text, timeCreated, rating, fk_Studentid_User, fk_Universityid_University) VALUES 
('Great experience and learning environment.', '2024-01-15', 5, 1, 1),
('Excellent faculty and resources.', '2024-01-20', 4, 2, 1);

INSERT INTO Application (motivation_letter, status, dateTime, fk_Studentid_User, fk_Resumeid_Resume, fk_Courseid_Course) VALUES 
('I am passionate about computer science.', 'Submitted', '2024-01-22 12:00:00', 1, 1, 1),
('I am eager to learn and contribute.', 'Under Review', '2024-01-23 13:00:00', 2, 2, 1);

INSERT INTO Message (text, timeSent, attachment, fk_Chatid_Chat, fk_Studentid_User) VALUES 
('Hello, I have a question about the course.', '2024-01-25', NULL, 1, 1),
('Can you tell me more about the faculty?', '2024-01-26', NULL, 2, 2);

INSERT INTO Evaluation (reason, dateTime, fk_University_representativeid_User, fk_Applicationid_Application) VALUES 
('Outstanding academic record', '2024-01-30 15:00:00', 4, 1),
('Strong motivation and skills', '2024-01-31 16:00:00', 4, 2);
